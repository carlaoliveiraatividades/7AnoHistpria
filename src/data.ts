/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme, TimelineEvent, HistoricalSource, Curiosity, Badge } from './types';

export const THEMES: Theme[] = [
  {
    id: 'theme-1',
    number: 1,
    title: 'Das Sociedades Recoletoras às Primeiras Civilizações',
    shortTitle: 'Recolectores a Civilizações',
    color: 'from-amber-500 to-orange-700',
    accentColor: 'amber',
    iconName: 'Flame',
    subsections: [
      {
        id: 'theme-1-sub-1',
        title: 'Das sociedades recoletoras às primeiras sociedades produtoras',
        content: `O **Paleolítico** (idade da pedra lascada) foi marcado pelo **nomadismo** e por uma **economia recoletora**, onde as comunidades humanas sobreviviam da caça, pesca e recolha de frutos silvestres. Para se abrigarem, usavam cavernas ou tendas de peles, dependendo da deslocação das manadas de animais selvagens.

Durante este período, o domínio do **fogo** foi uma das maiores conquistas da humanidade, permitindo aquecer as cavidades, afugentar predadores, cozinhar alimentos e fortalecer os laços sociais. A **arte rupestre** (gravuras e pinturas nas rochas e grutas, como em Foz Côa ou Altamira) demonstra o pensamento simbólico e religioso das comunidades recoletoras, muitas vezes ligada a rituais de caça e fertilidade.

A arqueologia é a ciência fundamental para estudar este período através de fontes materiais (vestígios de ossos, artefactos de pedra e fogueiras).

Com a revolução do **Neolítico** (idade da pedra polida), há cerca de 10 000 anos, ocorre a transição para uma **economia produtora** baseada na **agricultura** e na **domesticidade e criação de animais** (pastorícia). Isto permitiu a **sedentarização** dos seres humanos, que passaram a viver em aldeamentos permanentes e a criar novas técnicas como a olaria para armazenar excedentes, a tecelagem para vestuário e a metalurgia.

Surgem também os monumentos **megalíticos** (grandes construções de pedra como menires, dólmenes ou antas e cromeleques), que revelam o culto dos mortos e a adoração de forças da natureza, servindo de locais de sepultura ou templos astronómicos.`,
        keyConcepts: ['Paleolítico', 'Neolítico', 'Nomadismo', 'Sedentarização', 'Arte Rupestre', 'Megalitismo', 'Recoleção', 'Arqueologia']
      },
      {
        id: 'theme-1-sub-2',
        title: 'Contributos das primeiras civilizações do Oriente antigo',
        content: `As primeiras grandes civilizações urbanas surgiram nas margens de grandes rios - as chamadas **Civilizações dos Grandes Rios** (ou Crescente Fértil):
* **Egito** (junto ao Rio Nilo)
* **Mesopotâmia** (junto aos Rios Tigre e Eufrates)
* **Índia** (junto ao Rio Indo)
* **China** (junto ao Rio Amarelo)

A fertilidade dos solos irrigados permitiu um enorme desenvolvimento agrícola, gerando excedentes que sustentaram o crescimento das cidades e a especialização do trabalho. Para gerir estas sociedades complexas, surgiu a necessidade de registo, o que levou à invenção da **escrita** (hieroglífica no Egito, cuneiforme na Mesopotâmia).

Estas sociedades eram fortemente **estratificadas** e hierarquizadas. No topo estavam os soberanos divinizados (Faraós no Egito, Reis-Sacerdotes na Mesopotâmia), seguidos por sacerdotes, escribas e militares, e na base encontravam-se camponeses, artesãos e escravos.

A **religião** era **politeísta** (adoração de vários deuses) e desempenhava um papel central na organização política e na economia, justificando o poder absoluto dos reis e controlando os ciclos das colheitas de forma teocrática.`,
        keyConcepts: ['Crescente Fértil', 'Rio Nilo', 'Hieróglifos', 'Cuneiforme', 'Sociedade Estratificada', 'Politeísmo']
      }
    ],
    flashcards: [
      {
        id: 'fc-1-1',
        term: 'Nomadismo',
        definition: 'Modo de vida das populações que não têm habitação fixa, deslocando-se constantemente para procurar alimentos através da caça e da recoleção.',
        context: 'Paleolítico'
      },
      {
        id: 'fc-1-2',
        term: 'Sedentarização',
        definition: 'Fixação permanente de uma comunidade num determinado território, facilitada no Neolítico pela agricultura e domesticação de animais.',
        context: 'Neolítico'
      },
      {
        id: 'fc-1-3',
        term: 'Megalitismo',
        definition: 'Construção de monumentos com grandes blocos de pedra (megálitos), como dólmenes, menires e cromeleques, com fins funerários ou religiosos.',
        context: 'Neolítico'
      },
      {
        id: 'fc-1-4',
        term: 'Politeísmo',
        definition: 'Crença ou adoração em múltiplos deuses ou divindades, característica das civilizações do Egito, Mesopotâmia, Grécia e Roma.',
        context: 'Primeiras Civilizações'
      },
      {
        id: 'fc-1-5',
        term: 'Economia Recoletora',
        definition: 'Economia que depende exclusivamente daquilo que a natureza oferece de forma espontânea: caça, pesca e recolha de vegetais.',
        context: 'Paleolítico'
      }
    ],
    quiz: [
      {
        id: 'q-1-1',
        themeId: 'theme-1',
        question: 'Qual das seguintes opções caracteriza o modo de vida do Paleolítico?',
        options: [
          'Sedentarização e agricultura ativa.',
          'Nomadismo e economia baseada na recoleção.',
          'Uso generalizado de escrita cuneiforme.',
          'Desenvolvimento de cidades junto ao Nilo.'
        ],
        correctIndex: 1,
        explanation: 'No Paleolítico, o ser humano era recoletor e nómada, dependente da deslocação dos recursos naturais e dos animais selvagens para subsistir.'
      },
      {
        id: 'q-1-2',
        themeId: 'theme-1',
        question: 'O que motivou a sedentarização humana no Neolítico?',
        options: [
          'O aparecimento da arte rupestre nas cavernas.',
          'A descoberta do fogo que manteve as pessoas nas grutas.',
          'A invenção da escrita hieroglífica pelos escribas.',
          'A descoberta da agricultura e a domesticação de animais.'
        ],
        correctIndex: 3,
        explanation: 'Com a agricultura e a pastorícia (economia produtora), as comunidades depararam-se com a necessidade de vigiar as plantações e os rebanhos, fixando-se no mesmo sítio.'
      },
      {
        id: 'q-1-3',
        themeId: 'theme-1',
        question: 'A invenção da escrita (cuneiforme e cuneiforme/hieróglifos) esteve principalmente associada a:',
        options: [
          'Necessidades de registo de impostos, colheitas e leis nas civilizações dos grandes rios.',
          'Rituais mágicos nas grutas paleolíticas.',
          'Trocas comerciais entre os marinheiros nómadas do deserto.',
          'Criação de canções de poetas gregos da época medieval.'
        ],
        correctIndex: 0,
        explanation: 'O surgimento do Estado e de administrações complexas exigiu o registo de excedentes, cobrança de impostos e controlo das águas dos rios, instigando o nascimento da escrita.'
      }
    ],
    reflection: [
      {
        id: 'ref-1-1',
        question: "Como teria mudado a tua vida diária se fosses um jovem a viver na transição do Paleolítico para o Neolítico? Que novas competências terias de aprender?",
        tip: "Pensa nos teus afazeres diários: antes tinhas de caçar e recolher frutos de caverna em caverna; agora tens de semear cereais, proteger o cercado de animais e modelar vasos de barro para armazenar trigos."
      }
    ]
  },
  {
    id: 'theme-2',
    number: 2,
    title: 'A Herança do Mediterrâneo Antigo',
    shortTitle: 'Mediterrâneo Antigo',
    color: 'from-blue-600 to-indigo-800',
    accentColor: 'blue',
    iconName: 'Compass',
    subsections: [
      {
        id: 'theme-2-sub-1',
        title: 'Os Gregos no século V a.C. - O modelo ateniense',
        content: `No século V a.C., **Atenas** destacou-se no mundo grego pela criação de uma forma pioneira de governo: a **democracia** (governo do povo). Mas atenção, no modelo da democracia ateniense a **cidadania** era muito restrita! 

Apenas eram considerados **cidadãos** os homens livres, maiores de idade, com serviço militar cumprido, filhos de pai e mãe atenienses. Estavam totalmente excluídos os metecos (estrangeiros), as mulheres e os escravos (que constituíam a vasta maioria da população).

Os cidadãos participavam diretamente na aprovação de leis, declarações de guerra e julgamentos através da assembleia popular reunida na **Eclésia**. Os órgãos políticos eram:
* A **Eclésia** (Assembleia de todos os cidadãos para deliberar leste-oeste)
* A **Bulé** (conselho que elaborava os projetos de leis)
* O **Tribunal dos Heliastas** (poder judicial)

Os gregos deixaram-nos uma herança cultural imensa. Destacam-se as **Artes Clássicas** (focadas na harmonia, simetria e proporção inspiradas no corpo humano, visíveis em templos como o Partenon), a representação teatral (comédia e tragédia), os Jogos Olímpicos, a História e a **Filosofia** com grandes mestres como Sócrates, Platão e Aristóteles, que procuravam explicar o mundo através da razão empírica.`,
        keyConcepts: ['Democracia Direta', 'Cidadania Restrita', 'Partenon', 'Eclésia', 'Filosofia', 'Jogos Olímpicos']
      },
      {
        id: 'theme-2-sub-2',
        title: 'O Mundo Romano no apogeu do Império',
        content: `Nos primeiros séculos d.C., Roma tornou-se o centro de um dos mais vastos impérios da História, que dominava todas as margens do mar Mediterrâneo (a que os romanos chamavam carinhosamente *Mare Nostrum*).

O sucesso do **Império Romano** assentou numa forte eficácia **administrativa**, num exército profissionalizado e disciplinado, e numa próspera **economia** urbana, mercantil e monetária, que unia as províncias por uma fantástica rede de estradas e portos fluviais/marítimos.

A expansão romana promoveu a **romanização**: a assimilação dos hábitos, da língua (o latim), do urbanismo, das divindades e das leis romanas pelas populações conquistadas. 

Os romanos destacaram-se pelo **urbanismo** monumental estruturando as cidades com fóruns, aquedutos, termas públicas, anfiteatros e arcos do triunfo. Através do **Direito Romano**, codificaram leis que ainda hoje servem de base para os sistemas jurídicos ocidentais modernos.`,
        keyConcepts: ['Mare Nostrum', 'Romanização', 'Direito Romano', 'Estradas Romanas', 'Urbanismo', 'Império Romano']
      },
      {
        id: 'theme-2-sub-3',
        title: 'Origem e difusão do Cristianismo',
        content: `Na **Palestina Romana**, província situada no Médio Oriente sob domínio de Roma, nasceu Jesus de Nazaré, cujos ensinamentos deram origem ao **Cristianismo**. 

Diferente do culto imperial e do politeísmo romano, o Cristianismo é uma religião **monoteísta** (um único Deus) baseada no amor ao próximo, na igualdade espiritual de todos os seres humanos perante Deus, na fraternidade e na esperança de salvação e vida eterna. Os seus textos sagrados dividem-se em **Antigo Testamento** (partilhado com a tradição judaica) e **Novo Testamento** (dos escritos evangélicos que relatam a vida e mensagem de Jesus).

Esta crença expandiu-se rapidamente pelo Império, impulsionada pelas estradas e comércio romanos e pela pregação dos apóstolos (como S. Paulo). Nos primeiros séculos, os cristãos sofreram terríveis perseguições porque o seu monoteísmo proibia-os de celebrar o culto divino devido ao Faraó-Imperador romano.

Mas no século IV d.C., o panorama muda:
* Em **313 d.C.**, o Imperador Constantino concede liberdade de culto aos cristãos através do **Édito de Milão**.
* Em **380 d.C.**, o Imperador Teodósio proclama o Cristianismo como a **religião oficial e exclusiva do Império Romano** através do Édito de Tessalónica.`,
        keyConcepts: ['Monoteísmo', 'Palestina', 'Édito de Milão', 'Constatização', 'Jesus de Nazaré', 'Novo Testamento']
      }
    ],
    flashcards: [
      {
        id: 'fc-2-1',
        term: 'Cidadão Ateniense',
        definition: 'Homem livre, filho de pai e mãe atenienses, maior de 18 anos, que prestou o serviço militar e tem direito a participar no governo da Cidade-Estado.',
        context: 'Grécia Antiga'
      },
      {
        id: 'fc-2-2',
        term: 'Romanização',
        definition: 'Processo de integração e adoção da cultura, língua latim, religião, leis e estilo de vida romano pelas populações das províncias conquistadas por Roma.',
        context: 'Império Romano'
      },
      {
        id: 'fc-2-3',
        term: 'Monoteísmo',
        definition: 'Doutrina religiosa que crê e defende a existência de um único Deus supremo (ex: Judaísmo, Cristianismo e Islamismo).',
        context: 'Religião'
      },
      {
        id: 'fc-2-4',
        term: 'Ostracismo',
        definition: 'Lei ateniense que permitia exilar da cidade por dez anos os cidadãos cujas ambições pusessem em perigo a sobrevivência da democracia.',
        context: 'Atenas'
      },
      {
        id: 'fc-2-5',
        term: 'Mare Nostrum',
        definition: 'Expressão latina que significa "O Nosso Mar", usada pelos romanos para designar o Mar Mediterrâneo, totalmente controlado e rodeado pelo seu Império.',
        context: 'Império Romano'
      }
    ],
    quiz: [
      {
        id: 'q-2-1',
        themeId: 'theme-2',
        question: 'Quem estava excluído dos direitos políticos na democracia da Atenas no Século V a.C.?',
        options: [
          'Apenas os escravos e mais ninguém.',
          'As mulheres, os metecos (estrangeiros) e os escravos.',
          'Todos os homens nascidos fora da Grécia continental.',
          'Somente os filósofos simpatizantes de Esparta.'
        ],
        correctIndex: 1,
        explanation: 'A democracia ateniense era direta mas altamente restrita. Mulheres, metecos e escravos não eram considerados cidadãos e não podiam votar ou participar das decisões.'
      },
      {
        id: 'q-2-2',
        themeId: 'theme-2',
        question: 'O Édit de Milão promulgado em 313 d.C. por Constantino foi decisivo para o Cristianismo porque:',
        options: [
          'Decretou a crucificação de todos os pecadores rebeldes.',
          'Concedeu a liberdade religiosa e o fim das perseguições aos cristãos no Império Romano.',
          'Dividiu o Império Romano do Ocidente em três novos reinos autónomos.',
          'Proibiu expressamente as doutrinas politeístas no senado de Roma.'
        ],
        correctIndex: 1,
        explanation: 'O Édito de Milão terminou com séculos de terríveis perseguições, garantindo liberdade total de consciência e culto a todas as religiões, incluindo o Cristianismo.'
      },
      {
        id: 'q-2-3',
        themeId: 'theme-2',
        question: 'Qual dos seguintes edifícios é considerado uma obra-prima da arquitetura clássica grega em Atenas?',
        options: [
          'O Coliseu de Roma.',
          'O Templo do Partenon na Acrópole.',
          'A Muralha da China.',
          'As Grandes Pirâmides de Gizé.'
        ],
        correctIndex: 1,
        explanation: 'O Partenon, erigido na Acrópole de Atenas no século V a.C., é a expressão máxima da arquitetura e harmonia escultural da Grécia Clássica.'
      }
    ],
    reflection: [
      {
        id: 'ref-2-1',
        question: "Dada a grande exclusão de mulheres, estrangeiros e escravos na Atenas Antiga, em que medida a democracia moderna que desfrutamos hoje é diferente e melhor?",
        tip: "Pensa no voto universal: hoje, todos os cidadãos maiores de idade têm direito a voto, independentemente do género, etnia ou estatuto social. No entanto, que novos desafios enfrenta a nossa democracia?"
      }
    ]
  },
  {
    id: 'theme-3',
    number: 3,
    title: 'A Formação da Cristandade Ocidental e a Expansão Islâmica',
    shortTitle: 'Cristandade e Islão',
    color: 'from-emerald-600 to-teal-800',
    accentColor: 'emerald',
    iconName: 'ShieldAlert',
    subsections: [
      {
        id: 'theme-3-sub-1',
        title: 'A Europa dos séculos VI a IX - Fragmentação e subsistência',
        content: `No século V d.C. (mais precisamente em **476 d.C.**), o Império Romano do Ocidente desmorona-se sob o peso de crises internas e das sucessivas **invasões bárbaras** (povos germânicos como os Visigodos, Suevos, Francos, etc.). Este marco inicia a chamada **Idade Média**.

O vasto império fragmentou-se em vários reinos germânicos. Assistiu-se a um declínio da vida nas cidades, um retrocesso comercial e uma fuga da população para as áreas rurais (ruralização).

A nível social e cultural, a **Igreja Católica** permaneceu como a única força com autoridade organizada do continente. Serviu de elemento unificador dos bárbaros (que se foram convertendo ao Catolicismo) e preservou a cultura latina medieval escrita e artística através dos monges copistas nos mosteiros.

Instalou-se uma **economia de subsistência** baseada na agricultura de sobrevivência, quase sem moeda circulante, onde quase toda a produção destinava-se unicamente ao autoconsumo local dentro dos latifúndios.`,
        keyConcepts: ['Queda de Roma', 'Idade Média', 'Invasões Bárbaras', 'Igreja Católica', 'Economia de Subsistência']
      },
      {
        id: 'theme-3-sub-2',
        title: 'O Mundo Muçulmano em expansão',
        content: `No século VII (ano 622 d.C. - a Hégira), na Península Arábica, o profeta **Maomé** funda o **Islamismo**, uma nova e poderosa religião monoteísta baseada na submissão a Alá (Deus), cujo livro sagrado é o **Corão** (ou Alcorão).

Após a morte de Maomé, verificou-se uma fulgurante **Expansão Islâmica** militar e comercial, que em escassas décadas conquistou todo o Médio Oriente, o Norte de África até chegar à Península Ibérica no ano **711 d.C.**.

O império árabe uniu vastíssimos territórios e estabeleceu uma rica **cultura islâmica**, caracterizada pelo desenvolvimento extraordinário das ciências (álgebra, astronomia, medicina), novas técnicas agrícolas de regadio (introdução de nora, canais e novos cultivos como citrinos e arroz), e uma arquitetura caracterizada pelo arco de ferradura e intrincados mosaicos geométricos (arabescos).`,
        keyConcepts: ['Maomé', 'Islamismo', 'Corão', 'Hégira', 'Regadio', 'Cultura Islâmica']
      },
      {
        id: 'theme-3-sub-3',
        title: 'A Sociedade Europeia dos séculos IX a XII - O Feudalismo',
        content: `Devido ao clima de insegurança extrema gerado pelas novas vagas de invasões (Vikings, Magiares e Normandos) entre os séculos IX e XI, os reis europeus foram incapazes de defender as fronteiras por si só. Isto forçou uma descentralização do poder e o surgimento do **Feudalismo**.

A sociedade organizava-se de forma tripartida pelo seu papel teológico-funcional:
1. **Clero**: "Os que oram", cuidavam das almas e da cultura intelectual, detentores de terras e riqueza.
2. **Nobreza**: "Os que combatem", guerreiros profissionais que defendiam militarmente a comunidade e governavam domínios em troca de vassalagem.
3. **Povo/Servos**: "Os que trabalham", a esmagadora maioria da população (camponeses e servos da gleba), que cavavam a terra e pagavam altíssimos impostos senhoriais ao clero e nobreza em troca de mera proteção.

O sistema baseava-se em relações de **vassalagem**, em que um vassalo jurava apoio militar e fidelidade a um senhor feudal (suserano) através de uma cerimónia solene (homenagem e investidura), recebendo em troca um feudo (normalmente um vasto território ou privilégio político).`,
        keyConcepts: ['Feudalismo', 'Sociedade Tripartida', 'Clero da Nobreza', 'Vassalo', 'Suserano', 'Feudo']
      },
      {
        id: 'theme-3-sub-4',
        title: 'A Península Ibérica nos séculos IX a XII - Do Condado à Fundação de Portugal',
        content: `Na Península Ibérica, as forças cristãs recuadas no norte montanhoso organizaram a resistência física nas Astúrias, dando início ao longo combate militar da **Reconquista Cristã** para recuperar os territórios aos mouros muçulmanos.

Para auxiliar na guerra santa, no século XI chegaram cruzados europeus à Ibéria. Entre eles estava o nobre francês **D. Henrique de Borgonha**, que pelos seus excelentes serviços recebeu o título de Conde do **Condado Portucalense** sob o suseranato de Leão e Castela, casando com a filha do rei D. Teresa.

Com a morte do Conde D. Henrique, o seu jovem e ambicioso filho **D. Afonso Henriques** revolta-se contra o jugo de Castela e a política de sua mãe. Vence-a na celebre **Batalha de S. Mamede (1128)**, assumindo o governo do condado.

Começa o processo de afirmação histórica de Portugal:
* **1139 (Batalha de Ourique)**: D. Afonso Henriques é aclamado Rei pelos soldados.
* **1143 (Tratado de Zamora)**: Reconhecimento da independência do Reino de Portugal por Castela.
* **1179 (Bula Manifestis Probatum)**: O Papa Alexandre III reconhece oficialmente perante a Igreja de Roma a independência e realeza de D. Afonso Henriques e as fronteiras do novo reino.`,
        keyConcepts: ['Reconquista Cristã', 'Condado Portucalense', 'D. Afonso Henriques', 'Batalha de S. Mamede', 'Tratado de Zamora', 'Manifestis Probatum']
      }
    ],
    flashcards: [
      {
        id: 'fc-3-1',
        term: 'Feudalismo',
        definition: 'Estrutura social, económica e política da sociedade medieval baseada nas relações de dependência pessoal (vassalagem) e na posse da terra (feudo).',
        context: 'Europa Medieval'
      },
      {
        id: 'fc-3-2',
        term: 'Vassalagem',
        definition: 'Relação de dependência recíproca entre duas pessoas livres da nobreza (vassalo e suserano), selada pelo juramento de fidelidade em troca de terras.',
        context: 'Feudalismo'
      },
      {
        id: 'fc-3-3',
        term: 'Reconquista Cristã',
        definition: 'Processo de luta militar no qual os reinos cristãos do norte da Península Ibérica recuperaram gradualmente os territórios sob domínio muçulmano.',
        context: 'História de Portugal'
      },
      {
        id: 'fc-3-4',
        term: 'Bula Manifestis Probatum',
        definition: 'Documento pontifício emitido pelo Papa Alexandre III em 1179 que declarou a independência do Reino de Portugal e reconheceu D. Afonso Henriques como legítimo rei.',
        context: 'Fundação de Portugal'
      },
      {
        id: 'fc-3-5',
        term: 'Corão',
        definition: 'O livro sagrado da religião islâmica que reúne as revelações do Deus Alá transmitidas ao profeta Maomé, contendo as normas de vida cívica e dogmas espirituais.',
        context: 'Mundo Islâmico'
      }
    ],
    quiz: [
      {
        id: 'q-3-1',
        themeId: 'theme-3',
        question: 'Quem eram as três "ordens" ou "estados" que compunham a sociedade feudal europeia medieval?',
        options: [
          'Os Senhores, os Vassalos e os Burgueses industriais.',
          'O Clero, a Nobreza e o Povo/Servos.',
          'Os Patrícios, os Plebeus e os Clientes do Império.',
          'Apenas os Reis absolutistas e as rainhas.'
        ],
        correctIndex: 1,
        explanation: 'A sociedade feudal era tripartida: Clero (cuidava das almas/cultura), Nobreza (guerreiros protetores) e Servos/Povo (trabalhadores agrícolas que sustentavam todos).'
      },
      {
        id: 'q-3-2',
        themeId: 'theme-3',
        question: 'Qual a batalha em 1128 em que D. Afonso Henriques assume as rédeas de governo do Condado Portucalense lutando contra os apoiantes da sua mãe D. Teresa?',
        options: [
          'Batalha de Ourique.',
          'Batalha de Aljubarrota.',
          'Batalha de São Mamede.',
          'Batalha de Toro.'
        ],
        correctIndex: 2,
        explanation: 'A Batalha de São Mamede em Guimarães pôs em confronto D. Afonso Henriques e os partidários de sua mãe, D. Teresa. Foi o início real da autonomia governativa de Portugal.'
      },
      {
        id: 'q-3-3',
        themeId: 'theme-3',
        question: 'Como se chama o documento emitido pelo Papa em 1179 que reconheceu definitivamente a independência de Portugal de forma diplomática na Europa cristã?',
        options: [
          'Tratado de Zamora.',
          'Bula Manifestis Probatum.',
          'Foral de Coimbra.',
          'Código Justiniano.'
        ],
        correctIndex: 1,
        explanation: 'A Bula Manifestis Probatum do Papa Alexandre III em 1179 foi a consagração diplomática internacional máxima da soberania e do título real português.'
      }
    ],
    reflection: [
      {
        id: 'ref-3-1',
        question: "D. Afonso Henriques liderou com determinação e carisma a conquista e unificação de um novo reino. Que qualidades achas necessárias para liderar pessoas e mudar o curso da história de um país?",
        tip: "Pensa no diplomata e militar: D. Afonso Henriques não foi apenas guerreiro (espada em punho em S. Mamede); também soube assinar o Tratado de Zamora com Castela e persuadir o Papa em Roma. O que valorizas mais na liderança?"
      }
    ]
  },
  {
    id: 'theme-4',
    number: 4,
    title: 'Portugal no Contexto Europeu dos Séculos XII a XIV',
    shortTitle: 'Portugal nos Sécs. XII-XIV',
    color: 'from-rose-600 to-red-800',
    accentColor: 'rose',
    iconName: 'Crown',
    subsections: [
      {
        id: 'theme-4-sub-1',
        title: 'Desenvolvimento económico, relações sociais e poder político',
        content: `Nos séculos XII a XIV, Portugal consolida o seu espaço físico após esticar a fronteira meridional até ao Algarve com o rei D. Afonso III. Com a estabilização militar da Reconquista nacional, verifica-se uma era de expansão económica e de afirmação parlamentar.

Surge uma nova classe social ligada ao comércio e aos negócios urbanos: a **burguesia**. Para dinamizar a economia, os monarcas incentivam a realização de **mercados** e feiras periódicas, isentando os feirantes de tributos (as chamadas Feiras Francas).

O rei emite **Forais** criando os **Concelhos** (comuna medieval governada por "homens-bons" locais), dividindo as decisões locais administrativamente com o povo organizado. 

Para refrear o enorme poder das ordens feudais privilegiadas (clero e nobreza), os reis portugueses iniciam a centralização política. Em **1254 (nas Cortes de Leiria)** convocadas por D. Afonso III, regista-se um imenso marco histórico: pela primeira vez na Europa, representantes do povo comum (o braço dos procuradores dos concelhos) participam ao lado do Clero e da Nobreza nas **Cortes** gerais para votar dotações e impostos reais.

**Lisboa** torna-se o principal poço-porto português de atividade comercial marítima com o resto do norte europeu (Flandres e Inglaterra).`,
        keyConcepts: ['Burguesia', 'Cortes de Leiria', 'Foral', 'Concelhos', 'Feiras Francas', 'Lisboa Medieval']
      },
      {
        id: 'theme-4-sub-2',
        title: 'Cultura portuguesa face aos modelos europeus',
        content: `A cultura portuguesa medieval desenvolve-se sob fortes correntes artísticas e intelectuais europeias. 

Surgem as primeiras **Universidades** portuguesas: fundada por D. Dinis em Coimbra/Lisboa no ano **1290** (Estudo Geral), o que impulsionou o saber letrado laico e das ciências humanas. Nas cortes reais florescia a escrita poética nobreza da lírica em Galego-Portuquês (cantigas de amor, amigo e de maldizer).

A nível artístico de edifícios monumentais, surgiram duas grandes expressões marcantes da Idade Média:
* O Estilo **Românico** (séculos XI–XIII): Arquitetura sóbria, militar, com paredes de pedra muito grossas, janelas pequenas estreitas e arcos redondos de abóbada (expressão do retraimento, reflexo dos tempos instáveis de guerra, ex: Sé Velha de Coimbra).
* O Estilo **Gótico** (séculos XIII–XV): Arquitetura caracterizada pelo arco quebrado ogival, teto em abóbada de cruzaria e imensos vitrais coloridos que banhavam o interior sagrado de luz (expressão de progresso científico, verticalidade ascendente ao céu, ex: Mosteiro da Batalha/Alcobaça).`,
        keyConcepts: ['Universidade de Coimbra', 'Românico', 'Gótico', 'Cantigas Medievais', 'Estudo Geral']
      },
      {
        id: 'theme-4-sub-3',
        title: 'As crises e revolução do século XIV (1383-1385)',
        content: `O século XIV na Europa e em Portugal foi uma época dramática, marcada por forte retrocesso do clima climático (Fomes) e assolada pela terrível epidemia da **Peste Negra (1348)**, que dizimou um terço da população europeia.

Esta devastação biológica gerou **crises económicas** e sociais profundas, com desorganização agrícola por falta extrema de braços produtores de terra, inflação, quebras de rendimento e violentas revoltas populares por melhores salários civis nos campos de trabalho.

A este caos acrescentou-se a grande crise política de **1383-1385** em Portugal: com a morte de D. Fernando sem deixar herdeiros varões diretos de coroa, a herdeira Dona Beatriz casara-se com o rei D. João I de Castela, colocando em iminente perigo a própria independência nacional política de anexação territorial.

A nação cindiu-se em duas fações:
* Nobreza tradicional tradicional que apoiava Castela.
* Burguesia urbana e povo comum que apoiavam a independência e o carismático **D. João, Mestre de Avis**.

Eis o desenrolar revolucionário:
1. **As Cortes de Coimbra (1385)**: D. João Mestre de Avis é eleito democraticamente Rei de Portugal pelos legistas nacionais no parlamento medieval (consolidando o poder do Mestre).
2. **A Batalha de Aljubarrota (1385)**: As forças portuguesas, lideradas pelo génio militar do Condestável **D. Nuno Álvares Pereira**, e recorrendo à fantástica tática do quadrado militar defensivo, desbaratam o vasto exército invasor de Castela, garantindo para sempre a sobrevivência e autonomia da dinastia de Avis do reino luso.`,
        keyConcepts: ['Peste Negra', 'Crise de 1383-1385', 'Mestre de Avis', 'Nuno Álvares Pereira', 'Batalha de Aljubarrota', 'Cortes de Coimbra']
      }
    ],
    flashcards: [
      {
        id: 'fc-4-1',
        term: 'Burguesia',
        definition: 'Grupo social urbano que surgiu na Baixa Idade Média, composto por mercadores, artesãos, banqueiros e lojistas que retiravam a sua riqueza do capital e comércio marítimo.',
        context: 'Desenvolvimento Social'
      },
      {
        id: 'fc-4-2',
        term: 'Cortes',
        definition: 'Assembleia consultiva convocada pelo rei onde se reuniam as três ordens sociais: Clero, Nobreza e, a partir de 1254 nas Cortes de Leiria, o Povo.',
        context: 'Poder Político'
      },
      {
        id: 'fc-4-3',
        term: 'Gótico',
        definition: 'Estilo artístico medieval marcado pela verticalidade, arcos em ogiva quebrada, abóbada de cruzaria e grandes vitrais, permitindo interiores muito iluminados.',
        context: 'Arte Medieval'
      },
      {
        id: 'fc-4-4',
        term: 'Peste Negra',
        definition: 'Grave pandemia de peste bubónica devastadora que assolou a Europa a partir de 1348, eliminando cerca de 30% a 50% de toda a população viva.',
        context: 'Crise do Século XIV'
      },
      {
        id: 'fc-4-5',
        term: 'Foral',
        definition: 'Documento real ou senhorial que concedia privilégios, liberdades, e definia deveres e impostos para os habitantes que fundavam ou viviam num concelho.',
        context: 'Concelhos Medievais'
      }
    ],
    quiz: [
      {
        id: 'q-4-1',
        themeId: 'theme-4',
        question: 'O ano de 1254 marcou a convocação das célebres Cortes de Leiria pelo rei D. Afonso III. Por que foram revolucionárias na Europa?',
        options: [
          'Pela primeira vez, os representantes do povo comum (concelhos) foram convocados para as Cortes ao lado de Clero e Nobreza.',
          'Pois nelas se declarou o fim da dinastia de Avis.',
          'Decretaram a isenção de impostos das ordens mais desfavorecidas.',
          'Ali se assinou o Tratado de Zamora que fundou o Condado.'
        ],
        correctIndex: 0,
        explanation: 'Nas Cortes de Leiria de 1254, registou-se a introdução pioneira do Terceiro Estado (Povo) na assembleia de coroa, quebrando o monopólio político das ordens privilegiadas.'
      },
      {
        id: 'q-4-2',
        themeId: 'theme-4',
        question: 'Qual a principal diferença arquitetónica entre o estilo Românico e o estilo Gótico medieval?',
        options: [
          'O estilo Românico possui paredes lisas de betão e vidro, já o estilo Gótico é feito de madeira e canas.',
          'O Românico é escuro, com paredes muito grossas e arcos redondos; o Gótico é vertical, cheio de vitrais, e arcos quebrado em ogiva.',
          'O Gótico desenvolveu-se no antigo Egito, enquanto o Românico foi inventado pelo Faraó.'
        ],
        correctIndex: 1,
        explanation: 'A arte Românica (sécs. XI-XIII) assemelha-se a fortalezas militares fechadas de arcos redondos; a arte Gótica (sécs. XIII-XV) é luminosa, alta e usa ogivas esguias.'
      },
      {
        id: 'q-4-3',
        themeId: 'theme-4',
        question: 'Quem liderou as forças portuguesas na decisiva vitória da Batalha de Aljubarrota em 1385 impedindo a união nacional forçada com Castela?',
        options: [
          'O Conde D. Henrique de Borgonha.',
          'D. João I Mestre de Avis e o Condestável D. Nuno Álvares Pereira.',
          'Sócrates e Platão com os seus soldados gregos.',
          'A professora Carla Oliveira.'
        ],
        correctIndex: 1,
        explanation: 'D. João I e o seu comandante militar D. Nuno Álvares Pereira arquitetaram a vitória em Aljubarrota contra as tropas invasoras de Castela, quebrando os perigos de anexação.'
      }
    ],
    reflection: [
      {
        id: 'ref-4-1',
        question: "Diz-nos o provérbio português que 'A necessidade aguça o engenho'. Como é que a tática da asa do quadrado usada por Nuno Álvares Pereira em Aljubarrota, com muito menos homens, espelha este ditado?",
        tip: "O exército de Castela era muito maior e mais pesado. Com a astúcia táctica de cavar trincheiras em terreno estreito e criar uma defesa de quadrado intransponível, os portugueses venceram pela astúcia mental. Como resolves os teus desafios quando tens menos poder?"
      }
    ]
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'tl-1',
    themeId: 'theme-1',
    year: 'c. 10 000 a.C.',
    title: 'A Revolução Agrícola do Neolítico',
    description: 'Transição das sociedades recolectoras à agricultura e fixação no território em habitações.',
    extendedExplanation: 'Na região do Crescente Fértil, as mulheres e homens descobrem o ciclo da germinação do trigo e cevada e domesticam ovelhas, cães e cabras. Isto estimulou a olaria para cozinhar excedentes, a tecelagem para vestuário quente e o surgimento dos primeiros povoados da humanidade.',
    curiosity: 'O mamute lanudo acabou por desaparecer nesta transição devido à melhoria térmica do clima.'
  },
  {
    id: 'tl-2',
    themeId: 'theme-1',
    year: 'c. 3300 a.C.',
    title: 'Invenção da Escrita na Mesopotâmia',
    description: 'Design de caracteres cuneiformes para contabilidade e escrita no Crescente Fértil.',
    extendedExplanation: 'Em Suméria (Mesopotâmia central), a necessidade de registar os grãos da cidade-templo e o ouro estatal motiva o desenho de marcas com estilete triangular em tabuinhas de argila mole. Isto marca poeticamente a passagem para o início oficial do período da História Escrita do Mundo.',
    curiosity: 'Os hieróglifos egípcios eram considerados "palavras sagradas de deuses" e só escribas selecionados as liam.'
  },
  {
    id: 'tl-3',
    themeId: 'theme-2',
    year: 'Século V a.C.',
    title: 'Apogeu da Democracia Ateniense',
    description: 'Périplo de Péricles e o florescimento cultural da pólis grega na Acrópole.',
    extendedExplanation: 'Debate de cidadãos livres na Eclésia de Atenas para governar o território comum de forma soberana e pioneira. Paralelamente, constrói-se o templo majestoso do Partenon de harmonia clássica e grandes pensadores inventam a reflexão crítica da filosofia nas ágoras comerciais.',
    curiosity: 'O termo "Ostracismo" vinha do pedaço de argila de prato partido (ostrako) na qual escreviam o exilado.'
  },
  {
    id: 'tl-4',
    themeId: 'theme-2',
    year: 'Século II d.C.',
    title: 'A Pax Romana e Romanização',
    description: 'Fronteiras consolidadas ao redor de todo o Mediterrâneo e expansão imperial.',
    extendedExplanation: 'Roma estabiliza o imenso império urbano do Mediterrâneo, pavimentando milhares de quilómetros civis de estradas romanas fortes e monumentais. Os povos subjugados assumem o código do Direito Romano, o latim gramatical, o uso de água quente em termas e os aquedutos higiénicos.',
    curiosity: 'As estradas romanas eram tão robustas que várias ainda hoje dão suporte ao alcatrão nacional na Europa.'
  },
  {
    id: 'tl-5',
    themeId: 'theme-2',
    year: '313 d.C.',
    title: 'Liberdade para o Cristianismo',
    description: 'Imperador Constantino promulga o histórico Édito de Milão de liberdade religiosa.',
    extendedExplanation: 'O Cristianismo, nascido na pobre província da Palestina ocupada, ganha imunidade legal. Os cristãos deixam de ser devorados nos anfiteatros ou decapitados pelas tropas imperiais devido ao seu monoteísmo. Mais tarde, em 380 d.C., torna-se fé estatal protegida e única.',
    curiosity: 'O imperador convertia-se antes de morrer para garantir a salvação completa do plano católico.'
  },
  {
    id: 'tl-6',
    themeId: 'theme-3',
    year: '476 d.C.',
    title: 'Queda do Império Romano do Ocidente',
    description: 'Invasões germânicas bárbaras depõem o último imperador de Roma e estilhaçam a união Europeia.',
    extendedExplanation: 'A deposição de Rómulo Augústulo marca a queda de poder secular da capital. Entra-se num período medieval ruralizado e inseguro, com retração económica extrema e de autoprodução senhorial de subsistência de castas germânicas camponesas de campos.',
    curiosity: 'Os bárbaros não queriam destruir Roma; queriam apenas os luxos e o título cobiçado de cidadãos.'
  },
  {
    id: 'tl-7',
    themeId: 'theme-3',
    year: '711 d.C.',
    title: 'Invasão Islâmica da Península Ibérica',
    description: 'Forças árabes cruzam Gibraltar e conquistam as glebas ibéricas ocupadas por visigodos.',
    extendedExplanation: 'Tárique lidera o contingente que bate o rei visigodo Rodrigo. O Califado de Damasco integra a Ibéria, iniciando mais de 500 anos de convivência e florescimento técnico de horticultura com canais de rega rústica, algarismos modernos e sumptuosos monumentos góticos-mouros.',
    curiosity: 'A palavra "Algarve", "Alcântara", "Azeite" e "Alface" derivam diretamente da herança linguística árabe lusa.'
  },
  {
    id: 'tl-8',
    themeId: 'theme-3',
    year: '1143 d.C.',
    title: 'Tratado de Zamora: Independência Portuguesa',
    description: 'D. Afonso Henriques e o rei Afonso VII reconhecem a autonomia mútua de reinos lídimos.',
    extendedExplanation: 'O jovem infante consolida a vitória de S. Mamede (1128) e do milagre militar de Ourique (1139) jurando alinhamento diplomático na cidade de Zamora frente ao legado romano de coroa. Portugal nasce formalmente de fronteiras definidas face ao imenso império castelhano.',
    curiosity: 'D. Afonso Henriques tinha cerca de 1,90m de altura, um verdadeiro gigante de ferro para o seu tempo histórico!'
  },
  {
    id: 'tl-9',
    themeId: 'theme-4',
    year: '1254 d.C.',
    title: 'Cortes de Leiria: Representação Popular',
    description: 'D. Afonso III convoca o parlamento de três ordens com representantes do povo e de burguesia rural.',
    extendedExplanation: 'Portugal assume posição democrática vanguardista de debate: além de Bispos de Clero e Senhores de Espada, o monarca ouve os clérigos-advogados representantes dos concelhos comuns livres luso. Inicia-se o decréscimo de impunidade absolutista feudal.',
    curiosity: 'Nascer de Cortes de Leiria foi uma jogada para diminuir o terrível abuso alfandegário do clero católico.'
  },
  {
    id: 'tl-10',
    themeId: 'theme-4',
    year: '1348 d.C.',
    title: 'A Peste Negra Assola a Europa lusa',
    description: 'Grave peste microbiológica de pulgas ataca cidades medievais enfraquecendo feiras e campos.',
    extendedExplanation: 'Portugal perde quase 40% da população laboral ativa. O ceifador invisível quebra circuitos de feituras, desvaloriza o dinheiro real e causa pânico, desaguando em profunda carência de cereais e fúria camponesa de campos medievais vazios.',
    curiosity: 'Muitos andavam com flores nos bolsos para perfumar o ar que achavam "infetado ou miasmático" de germes!'
  },
  {
    id: 'tl-11',
    themeId: 'theme-4',
    year: '1385 d.C.',
    title: 'Vitória de Aljubarrota',
    description: 'A tática genial do quadrado militar de D. Nuno Álvares Pereira destrói a cavalaria castelhana.',
    extendedExplanation: 'Em Agosto, sob o calor abrasador dos montes de Aljubarrota, a independência portuguesa é firmada pelo Mestre de Avis com as asas de quadrado militar heróicas. Castela recua humilhada diplomaticamente salvaguardando a soberania da nova dinastia de Avis.',
    curiosity: 'A tática do quadrado medieval foi inspirada em batalhas inglesas que Nuno leu em tratados latinos antigos.'
  }
];

export const HISTORICAL_SOURCES: HistoricalSource[] = [
  {
    id: 'src-1',
    themeId: 'theme-1',
    title: 'Arte Rupestre de Foz Côa',
    type: 'image',
    reference: 'Vale do Côa, Portugal - c. 22 000 a.C. (Paleolítico)',
    visualAsset: 'Gravura de cavalo esguio sobre pedra de xisto rústico do Paleolítico.',
    description: 'Uma série fascinante de painéis de arte rupestre gravados ao ar livre nas encostas do rio. Apresenta gravuras de cavalos selvagens, auroques e cabras que testemunham a ocupação recoletora de bandos humanos que usavam cinzéis e pedras afiadas de quartzo.',
    questions: [
      '1. Que tipo de animais estão representados na gravura e a que período pertencem?',
      '2. Porque é que estas gravuras são uma fonte histórica importante para nós se não têm escrita?'
    ],
    suggestedAnswers: [
      'Representa principalmente cavalos, cabras e touros selvagens (auroques) do período Paleolítico (Idade da Pedra Lascada).',
      'São uma importante fonte histórica material e iconográfica que nos permite compreender o quotidiano, as práticas mágicas ou religiosas de caça e o ambiente estético dos primeiros humanos, mesmo sem existirem registos escritos reais.'
    ]
  },
  {
    id: 'src-2',
    themeId: 'theme-1',
    title: 'Fragmento do Código de Hamurábi',
    type: 'text',
    reference: 'Mesopotâmia (Babilónia) - Séc. XVIII a.C. (Escrita Cuneiforme)',
    visualAsset: 'Estela cilíndrica de diorito preto com hierática escrita cuneiforme densa.',
    contentHtml: '«Se um homem cego partir o dente de outro homem da mesma classe, ser-lhe-á dente por dente quebrado... Se quebrar o osso de um camponês, pagará uma mina de prata... Se quebrar o osso do escravo de outro homem, pagará ao dono a metade do preço dele...»',
    description: 'Um dos blocos monumentais de leis mais célebres do mundo, assente na Tábua da Lei do Talião (olho por olho, dente por dente) que regula as relações hierárquicas mesopotâmicas.',
    questions: [
      '1. Que relação existia entre a severidade da punição penal e as classes sociais dos cidadãos no Código de Hamurábi?',
      '2. Como é que esta fonte comprova que a Mesopotâmia era uma sociedade estratificada?'
    ],
    suggestedAnswers: [
      'A punição dependia inteiramente do estatuto da vítima e do agressor: era grave (Talião) entre iguais, mas convertia-se em multa monetária contra classes inferiores ou meias indemnizações a donos de escravos.',
      'Comprova pois diferencia as pessoas explicitamente por lei em três estratos jurídicos: o Homem de Plenos Direitos, o Camponês/Artesão livre de média estatura (mushkenu) e o Escravo.'
    ]
  },
  {
    id: 'src-3',
    themeId: 'theme-2',
    title: 'O Partenon de Atenas',
    type: 'image',
    reference: 'Acrópole de Atenas - Séc. V a.C. (Período Clássico)',
    visualAsset: 'Templo imponente com colunas dóricas de mármore branco simétrico no cume da acrópole.',
    description: 'O templo construído em honra de Atena Partenos pelos arquitetos Ictinos e Calícrates sob a administração do estadista democrático Péricles. Simboliza a estabilidade simétrica, o humanismo e o equilíbrio de proporções intelectuais da civilização helénica.',
    questions: [
      '1. Que características da arte clássica grega de equilíbrio e simetria se destacam nesta fachada monumental?',
      '2. Qual era o papel político da Acrópole nas pólis democráticas atenienenses?'
    ],
    suggestedAnswers: [
      'Destacam-se as colunas de ordem dórica equidistantes, a trave simétrica, o frontão triangular superior e um forte sentido de proporção matemática geométrica.',
      'A Acrópole era a colina fortificada sagrada da pólis que abrigava os tesouros e os templos dos deuses protetores, servindo de símbolo do orgulho e proteção religiosa da cidade perante ameaças externas.'
    ]
  },
  {
    id: 'src-4',
    themeId: 'theme-3',
    title: 'Carta de Foral de D. Afonso Henriques',
    type: 'text',
    reference: 'Foral de Guimarães - 1128 (Fundação de Portugal)',
    visualAsset: 'Manuscrito rústico sobre pergaminho encarquilhado com selo real de chumbo romano.',
    contentHtml: '«Em nome do Pai, do Filho e do Espírito Santo... Eu, Afonso, Infante, Filho de Henrique, concedo aos homens de Guimarães o privilégio de não pagarem impostos excessivos perante o alcaide da vila... Aquele que for ao mercado de feira não poderá ser preso por dívida de espadas de Castela...»',
    description: 'Copia histórica de foral que visa blindar a simpatia militar das elites concelhias da vila de Guimarães para apoiarem o processo de independência do infante rebelde ante os galegos.',
    questions: [
      '1. Qual era o objetivo principal do Infante D. Afonso Henriques ao emitir estes privilégios aduaneiros de feirantes?',
      '2. Identifica um benefício concreto dado aos mercadores no texto do Foral.'
    ],
    suggestedAnswers: [
      'O objetivo era atrair e fixar pessoas ao território do Condado para auxiliar os combates de Reconquista e centralizar a cooperação urbana frente a Castela.',
      'A isenção da tributação de comércio excessiva e a segurança jurídica de não ficar preso por dívidas antigas de Castela aquando da presença no mercado local.'
    ]
  }
];

export const CURIOSITIES: Curiosity[] = [
  {
    id: 'cur-1',
    themeId: 'theme-1',
    title: 'O Enigma dos Fenícios e a Tinta Púrpura',
    fact: 'Os fenícios criaram um alfabeto prático de 22 letras cruciais para o comércio.',
    didYouKnow: 'Que a tinta púrpura vermelha real que os reis usavam vinha de milhares de caracóis marinhos putrefactos pisados em caldeiras gigantes? Cheirava terrivelmente mal, mas era tão cara que só imperadores a podiam usar!'
  },
  {
    id: 'cur-2',
    themeId: 'theme-2',
    title: 'As Provedorias de Cozinha dos Legionários de Roma',
    fact: 'A ração base dos soldados invencíveis de Roma não era a carne, mas sim o cereal.',
    didYouKnow: 'Que os legionários marchavam cerca de 30 km diários carregando 40 kg às costas, e alimentavam-se de uma papa de trigo esmagado fervido com vinagre para matar os micróbios intestinais da água?'
  },
  {
    id: 'cur-3',
    themeId: 'theme-3',
    title: 'A caneta secreta dos Monges Medievais',
    fact: 'Quase todos os livros medievais eram copiados manualmente por monges católicos rurais.',
    didYouKnow: 'Que os monges copistas passavam o inverno em mosteiros tão frios que a tinta congelava nas penas? Por isso, escreviam à margem das cópias reclamações rústicas engraçadas como: "Dói-me o traseiro", "O pergaminho é peludo" ou "Graças a Deus vai anoitecer"!'
  },
  {
    id: 'cur-4',
    themeId: 'theme-4',
    title: 'Porquê a tática da "Padeira de Aljubarrota"?',
    fact: 'Diz a lenda popular que a padeira Brites de Almeida bateu em invasores de Castela fugidos.',
    didYouKnow: 'Que com a sua pá de madeira de cozer pão no forno, a padeira terá morto sete soldados castelhanos escondidos no seu estabelecimento? Uma grande lenda popular que inspirou a fúria e o patriotismo português!'
  }
];

export const BADGES: Badge[] = [
  {
    id: 'badge-explorer',
    title: 'Explorador da Pré-História',
    description: 'Completaste o estudo das Sociedades Recolectoras e do Neolítico.',
    icon: 'Compass',
    unlockedAtPoints: 100,
    className: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700'
  },
  {
    id: 'badge-citizen',
    title: 'Cidadão da Ágora',
    description: 'Analisaste a Democracia Grega e compreendeste o modelo ateniense.',
    icon: 'MessageSquare',
    unlockedAtPoints: 300,
    className: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700'
  },
  {
    id: 'badge-romanizer',
    title: 'Legionário do Saber',
    description: 'Dominaste as táticas da Romanização e do Direito Romano.',
    icon: 'Sword',
    unlockedAtPoints: 500,
    className: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700'
  },
  {
    id: 'badge-knight',
    title: 'Cavaleiro da Reconquista',
    description: 'Estudaste as batalhas do Condado Portucalense e D. Afonso Henriques.',
    icon: 'Shield',
    unlockedAtPoints: 800,
    className: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700'
  },
  {
    id: 'badge-historian',
    title: 'Mestre da Investigação',
    description: 'Resolveste com brilhantismo a análise das fontes históricas reais com perguntas orientadoras.',
    icon: 'FileText',
    unlockedAtPoints: 1100,
    className: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-700'
  },
  {
    id: 'badge-rebel',
    title: 'Defensor de Aljubarrota',
    description: 'Desvendaste a crise de 1383-1385 e a ascensão do Mestre de Avis.',
    icon: 'Activity',
    unlockedAtPoints: 1500,
    className: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-700'
  },
  {
    id: 'badge-grandmaster',
    title: 'Grão-Mestre da História',
    description: 'Obiveste o máximo aproveitamento e concluíste a plataforma da professora Carla Oliveira.',
    icon: 'Crown',
    unlockedAtPoints: 2000,
    className: 'bg-violet-150 text-violet-800 border-violet-400 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700'
  }
];
