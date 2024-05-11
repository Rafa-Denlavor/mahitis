// node --version # Should be >= 18
// npm install @google/generative-ai

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const prompt = document.querySelector(".chatbot-input").value;
const buttonSend = document.querySelector(".chatbot-send");

const API_KEY = "";
const MODEL_NAME = "gemini-pro";

console.log("Aqui vai");

async function runChat() {
  console.log("Entrei!");

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.7,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];

  const parts = [
    {
      text: "input: É verídico que o ex-presidente Bolsonaro bateu em uma reporter?",
    },
    {
      text: 'output: Sim, é verídico que o ex-presidente Jair Bolsonaro agrediu fisicamente um jornalista durante sua visita à Itália em 2021. O correspondente da Globo, Leonardo Monteiro, foi agredido com um soco no estômago e empurrado por um segurança durante uma cobertura de evento do G20. Além disso, outros jornalistas, incluindo a repórter Ana Estela de Sousa Pinto do jornal "Folha de S.Paulo", também sofreram agressões, sendo empurradas por seguranças e policiais italianos. Esses incidentes foram amplamente reportados e repudiados por várias entidades profissionais de jornalismo, incluindo a Associação Nacional de Jornais (ANJ) e a Associação Brasileira de Jornalismo Investigativo (Abraji), que destacaram a importância da liberdade de imprensa e a necessidade de punição para os responsáveis pelas agressões. Fonte: https://folha-de-sp.com',
    },
    { text: "input: Qual a chave pix correto para doar para RS Enchentes?" },
    {
      text: "output: A chave Pix correta para doar para a organização RS Enchentes é RS.Enchentes@bancodofuturo.org.br. Esta chave é utilizada para realizar doações diretamente através do sistema Pix, facilitando o processo de contribuição para apoiar as ações de assistência e recuperação após enchentes no Rio Grande do Sul. Fonte: https://rs.com",
    },
    {
      text: "input: Felipe Neto realmente usou o dinheiro arrecadado para RS por conta da enchentes ou ficou pra ele?",
    },
    {
      text: "output: Felipe Neto realmente usou o dinheiro arrecadado para ajudar as vítimas das enchentes no Rio Grande do Sul. Ele anunciou em suas redes sociais que já havia arrecadado mais de R$ 4,8 milhões para auxiliar na compra de alimentos e na distribuição de água potável. Além disso, Felipe Neto comprou 90 mil litros de água potável engarrafada para serem entregues no RS, usando seu próprio dinheiro, e planejou distribuir 220 mil litros de água para os moradores das regiões afetadas pelas inundações. Parte da arrecadação também foi destinada à compra de purificadores de água para ajudar aqueles que estão em lugares de difícil acesso em meio às enchentes. As doações foram transportadas para as áreas afetadas com a ajuda de um avião da Força Aérea Brasileira, e Felipe Neto se envolveu diretamente no planejamento e na execução logística, garantindo que os purificadores fossem entregues e funcionassem corretamente nas áreas mais atingidas pela catástrofe.",
    },
    {
      text: "input: Filhos de bolsonaro já estiveram envolvidos em corrupção?",
    },
    {
      text: 'output: Sim, os filhos de Jair Bolsonaro, o ex-presidente do Brasil, já estiveram envolvidos em investigações de corrupção. Aqui estão os principais casos:Flávio Bolsonaro, o filho mais velho, foi denunciado pelo Ministério Público do Rio de Janeiro em 2020 por liderar uma organização criminosa para recolher parte do salário de ex-funcionários públicos em benefício próprio, conhecido como "rachadinha". Isso ocorreu em seu antigo gabinete na Assembleia Legislativa do Rio, onde foi deputado estadual de 2003 a 2019. Outros 15 ex-assessores de Flávio também foram denunciados por peculato, lavagem de dinheiro, apropriação indébita e organização criminosa 3.Carlos Bolsonaro, vereador pelo Rio de Janeiro, também está sendo investigado pelo Ministério Público do Rio de Janeiro por suspeita de prática de "rachadinha" desde 2001, em seu gabinete na Câmara Municipal do Rio. Um dos funcionários fantasmas do vereador era uma idosa de 71 anos, e a madrasta de Jair Bolsonaro, Ana Cristina Siqueira Valle, e parentes dela estavam envolvidos no esquema de devolução de salários ao vereador 2.Renan Bolsonaro foi alvo de busca e apreensão em uma operação que investigava tráfico de influência e lavagem de dinheiro. Ele foi intimado pela Polícia Federal em 2021 a prestar depoimento, mas só compareceu em 2022 4.Esses casos demonstram que os filhos de Jair Bolsonaro enfrentam sérias acusações de corrupção, o que tem gerado controvérsias e debates sobre a ética política no Brasil.',
    },
    { text: "input: " },
    { text: "output: " },
  ];

  const chat = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });



  console.log("Antes de enviar a mensagem", prompt);

  const result = await chat
    .sendMessage(prompt)
    .then((response) => console.log({ response }))
    .catch((err) => {
      console.log({ err });
    });

  console.log("Depois de enviar a mensagem");

  const response = await result.response;

  return response.text();
}

buttonSend.addEventListener("click", () => {
  runChat()
    .then((response) => {
      console.log("resultado: ", response);
    })
    .finally(() => {
      console.log("Eita que deu bom essa integração!");
    });
});
