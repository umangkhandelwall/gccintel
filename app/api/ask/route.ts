import { NextRequest, NextResponse } from 'next/server';
import gccsData from '@/data/gccs.json';
import citiesData from '@/data/cities.json';
import policiesData from '@/data/policies.json';
import reconciliationData from '@/data/reconciliation.json';
import pipelineData from '@/data/pipeline.json';
import providersData from '@/data/providers.json';
import Fuse from 'fuse.js';

interface QueryPayload {
  question: string;
}

// Flattens all verified project rows into searchable knowledge chunks
function retrieveRelevantRecords(query: string, limit = 5) {
  const allCorpus: Array<{
    type: string;
    title: string;
    content: string;
    url: string;
    publisher: string;
    date: string;
  }> = [];

  // 1. GCC Entities
  gccsData.forEach((g: any) => {
    allCorpus.push({
      type: 'GCC Entity',
      title: `${g.name} (${g.city})`,
      content: `${g.name} is a ${g.operatingModel} Global Capability Center of ${g.parentCompany} (${g.parentCountry}) established in ${g.yearEstablished} located in ${g.city}, ${g.state} (${g.microMarket || 'Main Campus'}). Sector: ${g.parentSector}. Headcount: ${g.headcountBand}. Functions: ${g.functions.join(', ')}.`,
      url: g.sources?.[0]?.url || 'https://nasscom.in',
      publisher: g.sources?.[0]?.publisher || 'Company Disclosures',
      date: g.sources?.[0]?.date || '2024-01-01',
    });
  });

  // 2. City Real Estate & Rents
  citiesData.forEach((c: any) => {
    allCorpus.push({
      type: 'City Real Estate',
      title: `${c.name} Market Benchmark`,
      content: `${c.name} (${c.state}) has ${c.gccCount} GCC units and ~${c.totalHeadcount} workforce. Grade-A office rent ranges between ₹${c.gradeARentRange.min} and ₹${c.gradeARentRange.max}/sq ft/month (Weighted average: ₹${c.avgRent}/sq ft/month). Micro-markets: ${c.microMarkets.join(', ')}. Clusters: ${c.gccClusters.join(', ')}. Strengths: ${c.keyStrengths.join('; ')}. Challenge: ${c.primaryChallenge}.`,
      url: c.sources?.[0]?.url || 'https://cbre.co.in',
      publisher: c.sources?.[0]?.publisher || 'CBRE / JLL',
      date: c.sources?.[0]?.date || '2024-06-30',
    });
  });

  // 3. State Policy Subsidies
  policiesData.forEach((p: any) => {
    const incs = p.incentives.map((i: any) => `${i.type} (${i.quantifiedValue || 'available'}): ${i.description}`).join('; ');
    allCorpus.push({
      type: 'State Policy',
      title: `${p.state}: ${p.policyName}`,
      content: `${p.state} GCC policy (${p.policyYear}) administered by ${p.nodalAgency}. Target: ${p.target}. Incentives: ${incs}. Eligibility: ${p.eligibilityCriteria.join('; ')}. Process: ${p.applicationProcess}.`,
      url: p.officialUrl || 'https://karnatakadigital.in',
      publisher: p.nodalAgency,
      date: `${p.policyYear}-01-01`,
    });
  });

  // 4. Count Reconciliation
  reconciliationData.forEach((r: any) => {
    allCorpus.push({
      type: 'Count Benchmark',
      title: `${r.source} (${r.year})`,
      content: `${r.source} reported ${r.reportedCount} (${r.countType}) in ${r.year}. Definition: ${r.definition}. Root cause of discrepancy: ${r.whyItDiffers}. Revenue: ${r.revenue}. Headcount: ${r.headcount}.`,
      url: r.url || 'https://nasscom.in',
      publisher: r.source,
      date: `${r.year}-01-01`,
    });
  });

  // 5. Incoming Pipeline
  pipelineData.forEach((pip: any) => {
    allCorpus.push({
      type: 'Incoming Pipeline',
      title: `${pip.companyName} (${pip.targetCity})`,
      content: `${pip.companyName} (${pip.headquarters}, Sector: ${pip.sector}) setting up in ${pip.targetCity}, ${pip.targetState} (${pip.targetCluster}). Investment: ${pip.investmentAnnounced}. Projected headcount: ${pip.projectedHeadcount}. Stage: ${pip.signalStage}. Lead indicator: ${pip.leadIndicator}. Evidence: ${pip.filingEvidence}. Mandates: ${pip.keyWorkloads.join(', ')}.`,
      url: pip.officialSources?.[0]?.url || 'https://amgen.com',
      publisher: pip.officialSources?.[0]?.publisher || 'Official Press Release',
      date: pip.firstSignalDate,
    });
  });

  // 6. Service Providers
  providersData.forEach((pr: any) => {
    allCorpus.push({
      type: 'Service Provider',
      title: `${pr.name} (${pr.category})`,
      content: `${pr.name} (HQ: ${pr.headquarters}, Founded ${pr.yearFounded}) provides ${pr.operatingModel}. Delivery volume: ${pr.verifiedGccsEstablished}. Confirmed clients: ${pr.confirmedPublicClients.join(', ')}. Pricing: ${pr.pricingModel}. In-house capabilities: ${pr.verifiedCapabilities.join('; ')}.`,
      url: pr.officialSources?.[0]?.url || 'https://ansr.in',
      publisher: pr.officialSources?.[0]?.publisher || 'Company Disclosures',
      date: '2024-01-01',
    });
  });

  const fuse = new Fuse(allCorpus, {
    keys: ['title', 'content', 'type'],
    threshold: 0.45,
    includeScore: true,
  });

  const matches = fuse.search(query);
  return matches.slice(0, limit);
}

export async function POST(req: NextRequest) {
  try {
    const body: QueryPayload = await req.json();
    const query = body.question?.trim();

    if (!query) {
      return NextResponse.json({ error: 'Question parameter cannot be blank' }, { status: 400 });
    }

    // Step 1: Execute fuzzy search across the complete multi-entity knowledge corpus
    const retrievedMatches = retrieveRelevantRecords(query, 4);

    // If no reasonable match is found (score > 0.6 or empty), enforce strict refusal
    if (retrievedMatches.length === 0 || (retrievedMatches[0].score && retrievedMatches[0].score > 0.62)) {
      return NextResponse.json({
        answer: "I do not have verified, primary-sourced records in the GCC Intel dataset to answer that specific inquiry.\n\nTo preserve data integrity and prevent speculative assertions, GCC Intel strictly refuses to extrapolate or hallucinate unverified information.",
        citations: [],
        grounded: false,
      });
    }

    // Step 2: Dynamically synthesize response from the top matched rows
    const topItems = retrievedMatches.map(m => m.item);
    
    // Check if an external LLM key is configured (Anthropic or OpenAI)
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;

    if (apiKey && process.env.OPENAI_API_KEY) {
      try {
        const promptContext = topItems.map((item, idx) => `[Source ${idx + 1}] ${item.title}: ${item.content}`).join('\n\n');
        const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are GCC Intel's retrieval assistant. Answer the user's question ONLY using the factual context provided below. If the context does not contain enough information to answer, state clearly that you do not have verified data. Do not extrapolate, assume, or add outside facts. Format answers professionally with concise bullet points if applicable.\n\nFACTUAL CONTEXT:\n${promptContext}`,
              },
              { role: 'user', content: query },
            ],
            temperature: 0.1,
          }),
        });

        if (openAiRes.ok) {
          const aiJson = await openAiRes.json();
          const aiAnswer = aiJson.choices?.[0]?.message?.content;
          if (aiAnswer) {
            return NextResponse.json({
              answer: aiAnswer,
              citations: topItems.map((item, idx) => ({
                id: `cite_${idx + 1}`,
                entity: item.title,
                url: item.url,
                publisher: item.publisher,
                note: item.content.slice(0, 140) + '...',
              })),
              grounded: true,
            });
          }
        }
      } catch (err) {
        // Fallback to local deterministic synthesis if OpenAI API fails or is unreachable
      }
    }

    // Step 3: Dynamic Local Synthesis Engine (Zero external dependencies)
    // Synthesizes custom answers directly from retrieved dataset rows
    const primary = topItems[0];
    const secondary = topItems[1];

    let synthesizedText = `Based on verified records for **${primary.title}** (${primary.type}):\n\n${primary.content}`;

    if (secondary && secondary.title !== primary.title) {
      synthesizedText += `\n\nAdditionally, comparative data from **${secondary.title}** indicates:\n${secondary.content}`;
    }

    return NextResponse.json({
      answer: synthesizedText,
      citations: topItems.map((item, idx) => ({
        id: `cite_${idx + 1}`,
        entity: item.title,
        url: item.url,
        publisher: item.publisher,
        note: item.content.slice(0, 150) + '...',
      })),
      grounded: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal intelligence retrieval failure', details: String(error) },
      { status: 500 }
    );
  }
}
