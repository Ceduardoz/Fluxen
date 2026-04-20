import MainTemplate from "../../templates/MainTemplate";
import styles from "./styles.module.css";

export default function About() {
  return (
    <MainTemplate>
      <>
        <h1 className={styles.h1}>Fluxen</h1>

        <section className={styles.section}>
          <h2>Sobre o Fluxen</h2>
          <p>
            O Fluxen nasceu para transformar a relação das pessoas com o
            dinheiro. Acreditamos que o controle financeiro não deve ser uma
            tarefa árdua ou confusa, mas sim um hábito libertador. Nossa
            proposta é oferecer uma interface limpa e intuitiva que remove a
            complexidade das planilhas tradicionais, permitindo que você foque
            no que realmente importa:
            <strong> tomar decisões inteligentes para o seu futuro.</strong>
          </p>
          <p>
            Este sistema foi criado para ajudar no controle financeiro pessoal
            de forma prática e intuitiva. A proposta é centralizar todas as
            informações importantes em um único lugar, permitindo acompanhar
            gastos, receitas, cartões, investimentos e metas financeiras sem
            complicação. Diferente de planilhas bagunçadas ou aplicativos
            limitados, a plataforma permite visualizar tudo de forma organizada,
            facilitando decisões financeiras no dia a dia.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Proposta</h2>
          <p>
            Este ecossistema foi projetado para ser o seu braço direito na
            gestão de capital. O site funciona como um centralizador de
            inteligência financeira, servindo para:
          </p>
          <ul>
            <li>Organizar: Categorizar cada gasto e ganho.</li>
            <li>
              Analisar: Transformar números brutos em gráficos compreensíveis.
            </li>
            <li>
              Planejar: Estabelecer metas de economia e limites de gastos por
              categoria.
            </li>
            <li>
              Prever: Antecipar cenários e evitar surpresas no fim do mês.
            </li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2>Fluxo do Fluxen</h2>
          <ul>
            <li>
              Após o cadastro do usuário, ele deve configurar seu perfil e
              adicionar suas contas bancarias, escolhendo qual o banco e o valor
              em conta.
            </li>
            <li>
              Após isso o usuário é livre para fazer tuas transações, criação de
              metas, investimentos
            </li>
            <li>
              Em seguida, na pagina inicial(dashboard), ele pode vizualizar por
              meio de numeros ou gráficos como suas finanças estão se
              comportando.
            </li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2>Cada Página</h2>
          <h3>&#128202; Dashboard</h3>
          <p>
            É a sua "torre de comando". Aqui você visualiza o resumo do seu mês,
            o saldo consolidado de todas as suas contas e os indicadores de
            desempenho financeiro através de gráficos dinâmicos.
          </p>
          <h3>&#x1F4DD; Transações</h3>
          <p>
            O coração da operação. Nesta página, você tem o histórico completo
            de todas as transações. É onde você adiciona novas movimentações,
            edita registros antigos e filtra suas buscas por data ou valor.
          </p>
          <h3>&#127991;&#65039;Categorias </h3>
          <p>
            Onde a estratégia acontece. Você pode personalizar suas categorias
            de gastos e receitas, tendo as categorias pré-definidas como:
            Alimentação, Transporte e criar as suas próprias categorias.
          </p>
          <h3>&#127919; Metas</h3>
          <p>
            Defina e acompanhe o progresso de suas metas financeiras, seja para
            economizar ou pagar dívidas. lá você pode criar metas
            personalizadas, estabelecer prazos e monitorar seu progresso de
            forma visual, mantendo-se motivado e no caminho certo para alcançar
            seus objetivos financeiros.
          </p>
          <h3>&#9881; Configurações</h3>
          <p>
            Espaço dedicado à personalização da sua conta, ajustes de segurança,
            definições das contas e preferências do sistema para que a
            ferramenta fique com a sua cara.
          </p>
        </section>
      </>
    </MainTemplate>
  );
}
