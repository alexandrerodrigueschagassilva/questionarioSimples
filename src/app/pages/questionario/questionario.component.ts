import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Questionario } from './questionario.interface'


@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {
  formQuestionario: FormGroup | undefined;
  questoes: Questionario[];
  isEditable = true;
  questaoAtual;
  numeroQuestaoAtual = 0;
  btnAvancarDesabilitado = true;
  numeroTotal;

  public _mostrarResultado = false;
  public get mostrarResultado() {
    return this._mostrarResultado;
  }
  public set mostrarResultado(value) {
    this._mostrarResultado = value;
  }

  public alternarResultado(): void {
    this.mostrarResultado ? this.mostrarResultado = false: this.mostrarResultado = true;
  }

  public resultadoPerfilComportamental = {
    lobo: 0,
    aguia: 0,
    tubarao: 0,
    gato: 0
  }

  public resultadoPreferenciaCerebral = {
    esquerdo: 0,
    posterior: 0,
    direito: 0,
    anterior: 0
  }

  constructor(private _formBuilder: FormBuilder) {
    
    this.questoes = [
      {
        pergunta: 'Eu sou...',
        respostas: [
          'Idealista, criativo e visionário',
          'Divertido, espiritual e benéfico',
          'Confiável, meticuloso e previsível',
          'Focado, determinado e persistente'
        ],
        escolha: ['I','C','O','A']
      },
      {
        pergunta: 'Eu gosto de...', 
        respostas: [
          'Ser piloto',
          'Conversar com os passageiros',
          'Planejar a viagem',
          'Explorar novas rotas'
        ],
        escolha: ['A','C','O','I']
      },
      {
        pergunta: 'Se você quiser se dar bem comigo...', 
        respostas: [
          'Me dê liberdade',
          'Me deixei saber sua expectativa',
          'Lidere, siga ou saia do caminho',
          'Seja amigável, carinhoso e compreensivo'
        ],
        escolha: ['I','O','A','C']
      },
      {
        pergunta: 'Para conseguir obter bons resultados é preciso...', 
        respostas: [
          'Ter incertezas',
          'Controlar o essencial',
          'Diversão e celebração',
          'Planejar e obter recursos'
        ],
        escolha: ['I','O','C','A']
      },
      {
        pergunta: 'Eu me divirto quando...', 
        respostas: [
          'Estou me exercitando',
          'Tenho novidades',
          'Estou com outros',
          'Determino as regras'
        ],
        escolha: ['A','I','C','O']
      },
      {
        pergunta: 'Eu penso que...', 
        respostas: [
          'Unidos venceremos, divididos perderemos',
          'O ataque é a melhor defesa',
          'É bom ser manso, mas andar com um porrete',
          'Um homem prevenido vale por dois'
        ],
        escolha: ['C','A','I','O']
      },
      {
        pergunta: 'Minha preocupação é...', 
        respostas: [
          'Gerar a ideia global',
          'Fazer com que as pessoas gostem',
          'Fazer com que funcione',
          'Fazer com que aconteça'
        ],
        escolha: ['I','C','O','A']
      },
      {
        pergunta: 'Eu prefiro...', 
        respostas: [
          'Perguntas e respostas',
          'Ter todos os detalhes',
          'Vantagens a meu favor',
          'Que todos tenham a chance de ser ouvido'
        ],
        escolha: ['I','O','A','C']
      },
      {
        pergunta: 'Eu gosto de...', 
        respostas: [
          'Fazer progresso',
          'Construir memórias',
          'Fazer sentido',
          'Tornar as pessoas confortáveis'
        ],
        escolha: ['A','C','O','I']
      },
      {
        pergunta: 'Eu gosto de chegar...', 
        respostas: [
          'Na frente',
          'Junto',
          'Na hora',
          'Em outro lugar'
        ],
        escolha: ['A','C','O','I']
      },
      {
        pergunta: 'Um ótimo dia para mim é quando...', 
        respostas: [
          'Consigo fazer muitas coisas',
          'Me divirto com meus amigos',
          'Tudo segue conforme o planejado',
          'Desfruto de coisas novas e estimulantes'
        ],
        escolha: ['A','C','O','I']
      },
      {
        pergunta: 'Eu vejo a morte como...', 
        respostas: [
          'Uma grande aventura misteriosa',
          'Oportunidade para rever os falecidos',
          'Um modo de receber recompensas',
          'Algo que sempre chega muito cedo'
        ],
        escolha: ['I','C','O','A']
      },
      {
        pergunta: 'Minha filosofia de vida é...', 
        respostas: [
          'Há vencedores e perdedores, e eu acredito ser um vencedor',
          'Para eu ganhar ninguém precisa perder',
          'Para ganhar é preciso seguir as regras',
          'Para ganhar é necessário inventar novas regras'
        ],
        escolha: ['A','C','O','I']
      },
      {
        pergunta: 'Eu sempre gostei de...', 
        respostas: [
          'Explorar',
          'Evitar surpresas',
          'Focalizar a meta',
          'Realizar uma abordagem natural'
        ],
        escolha: ['I','O','A','C']
      },
      {
        pergunta: 'Eu gosto de mudanças se...', 
        respostas: [
          'Me der uma vantagem competitiva',
          'For divertido e puder ser compartilhado',
          'Me dar mais liberdade e variedade',
          'Melhorar ou me der mais controle'
        ],
        escolha: ['A','C','I','O']
      },
      {
        pergunta: 'Não existe nada de errado em...', 
        respostas: [
          'Se colocar na frente',
          'Colocar os outros na frente',
          'Mudar de ideia',
          'Ser consistente'
        ],
        escolha: ['A','C','I','O']
      },
      {
        pergunta: 'Eu gosto de buscar conselhor de...', 
        respostas: [
          'Pessoas bem sucedidas',
          'Anciões e conselheiros',
          'Autoridades no assunto',
          'Lugares, os mais estranhos'
        ],
        escolha: ['A','C','O','I']
      },
      {
        pergunta: 'Meu lema é...', 
        respostas: [
          'Fazer o que precisa ser feito',
          'Fazer bem feito',
          'Fazer junto com o grupo',
          'Simplesmente fazer'
        ],
        escolha: ['I','O','C','A']
      },
      {
        pergunta: 'Eu gosto de...', 
        respostas: [
          'Complexidade, mesmo se confuso',
          'Ordem e sistematização',
          'Calor humano e animação',
          'Coisas claras e simples'
        ],
        escolha: ['I','O','C','A']
      },
      {
        pergunta: 'Tempo pra mim é...', 
        respostas: [
          'Algo que detesto desperdiçar',
          'Um grande ciclo',
          'Uma flecha que leva ao inevitável',
          'Irrelevante'
        ],
        escolha: ['A','C','O','I']
      },  
      {
        pergunta: 'Se eu fosse bilionário...', 
        respostas: [
          'Faria doações para muitas entidades',
          'Criaria uma poupança avantajada',
          'Faria o que desse na cabeça',
          'Exibiria bastante com algumas pessoas'
        ],
        escolha: ['C','O','I','A']
      },
      {
        pergunta: 'Eu acredito que...', 
        respostas: [
          'O destino é mais importante que a jornada',
          'A jornada é mais importante que o destino',
          'Um centavo economizado é um centavo ganho',
          'Bastam um navio e uma estrela para navegar'
        ],
        escolha: ['A','C','O','I']
      }, 
      {
        pergunta: 'Eu acredito também que...', 
        respostas: [
          'Aquele e hesita está perdido',
          'De grão em grão a galinha enche o papo',
          'O que vai, volta',
          'Um sorriso ou uma careta é o mesmo para quem é cego'
        ],
        escolha: ['A','O','C','I']
      },   
      {
        pergunta: 'Eu acredito ainda que...', 
        respostas: [
          'É melhor prudência do que arrependimento',
          'A autoridade deve ser desafiada',
          'Ganhar é fundamental',
          'O coletivo é mais importante do que o individual'
        ],
        escolha: ['O','I','A','C']
      },  
      {
        pergunta: 'Eu penso que...', 
        respostas: [
          'Não é fácil ficar encurralado',
          'É preferível olhar, antes de pular',
          'Duas cabeças pensam melhor que uma',
          'Se você não tem condições de competir, não compita'
        ],
        escolha: ['I','O','C','A']
      }
    ]
    this.updateQuestaoAtual(0);
    this.numeroTotal = this.questoes.length;
  }
  ngOnInit(): void {
    this.formQuestionario = new FormGroup({
      opcao: new FormControl('',[Validators.required])
    });
  }

  verResultado(){}

  updateQuestaoAtual(valor) {
    this.numeroQuestaoAtual = valor;
    this.questaoAtual = this.questoes[this.numeroQuestaoAtual];
  }

  incrementarQuestao(valor) {
    this.numeroQuestaoAtual = valor + 1;
    this.questaoAtual = this.questoes[this.numeroQuestaoAtual];
    this.btnAvancarDesabilitado = true;
  }

  decrementarQuestao(valor) {
    this.numeroQuestaoAtual = valor - 1;
    this.questaoAtual = this.questoes[this.numeroQuestaoAtual];

    let resposta = this.questoes[this.numeroQuestaoAtual].resposta;
    let indicaResposta = this.questoes[this.numeroQuestaoAtual].escolha.indexOf(resposta);

    setTimeout(() => {
      document.getElementById(indicaResposta.toString()).click();
    }, 100);
  }

  opcaoEscolhida(evento, numeroDaQuestao, escolha) {

    this.btnAvancarDesabilitado = false;
    this.questoes[numeroDaQuestao].resposta = this.questoes[numeroDaQuestao].escolha[escolha];
    this.resultadoPerfilComportamental['lobo'] = this.questoes.filter((el) => {return el.resposta == 'O'}).length;
    this.resultadoPerfilComportamental['aguia'] = this.questoes.filter((el) => {return el.resposta == 'I'}).length;
    this.resultadoPerfilComportamental['tubarao'] = this.questoes.filter((el) => {return el.resposta == 'A'}).length;
    this.resultadoPerfilComportamental['gato'] = this.questoes.filter((el) => {return el.resposta == 'C'}).length;

    this.resultadoPreferenciaCerebral['esquerdo'] = this.questoes.filter((el) => {return el.resposta == 'O' || el.resposta == 'A'}).length;
    this.resultadoPreferenciaCerebral['posterior'] = this.questoes.filter((el) => {return el.resposta == 'C' || el.resposta == 'A'}).length;
    this.resultadoPreferenciaCerebral['direito'] = this.questoes.filter((el) => {return el.resposta == 'I' || el.resposta == 'C'}).length;
    this.resultadoPreferenciaCerebral['anterior'] = this.questoes.filter((el) => {return el.resposta == 'O' || el.resposta == 'I'}).length;

    this.atualizarGraficos();

  }

  //gráfico
  public pieChartLabels = ['Aguia', 'Gato', 'Tubarão', 'Lobo'];

  public pieChartData = [0, 0, 0, 0];
  public radarChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 1], label: 'Preferência cerebral' },
  ];

  pieChartOptions = {
    lengend: {
      position: 'bottom',
      align: 'center'
    },
    plugins: {
      labels: {
        render: 'percent',
        precision: 0,
        showZero: true,
        fontSize: 12,
        fontColor: '#000',
      }
    },
    title: {
      display: true,
      position: 'top',
      fontFamily: 'sans-serif',
      fontColor: '#666',
      fontSize: 24,
      text: 'Perfil comportamental'
    },
    animation: {
      duration : 0
    }
  }

  public pieChartType = 'pie';

  public pieChartPlugin = {
    labels: {
      render: 'value',
      fontSize: 14,
      fontStyle: 'bold',
      fontColor: '#000',
      fontFamily: '"Lucida Console", Monaco, monospace'
    }
  }

  atualizarGraficos() {
    this.pieChartData = [
      this.resultadoPerfilComportamental.aguia,
      this.resultadoPerfilComportamental.gato,
      this.resultadoPerfilComportamental.lobo,
      this.resultadoPerfilComportamental.tubarao
    ];

    this.radarChartData = [
      { data: 
        [
          this.resultadoPreferenciaCerebral.anterior,
          this.resultadoPreferenciaCerebral.direito,
          this.resultadoPreferenciaCerebral.posterior,
          this.resultadoPreferenciaCerebral.esquerdo
        ],
        label: 'Preferência cerebral',  
      }
    ];
    console.log(this.radarChartData[0].data)
    
  }

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    scales : {
      yAxes: 
      [
        {
          display: false,
          ticks: {
            beginAtZero: true,
            autoSkip: false,
            min: 0
          },
          gridLines: {
            display: false
          }
        }
      ]
    }
  };
  public radarChartLabels: Label[] = ['anterior', 'direito', 'posterior', 'esquerdo'];

  public radarChartType: ChartType = 'radar';

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
function rgb(arg0: number, arg1: number, arg2: number): import("chart.js").ChartColor {
  throw new Error('Function not implemented.');
}

