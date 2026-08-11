import type { ProjectCode } from "./types";

export const calculadoraCode: ProjectCode = {
  slug: "calculadora-financeira",
  title: "Calculadora Financeira",
  files: [
    {
      name: "FinanceCalculator.cs",
      language: "csharp",
      content: `using System;
using System.Collections.Generic;
using System.Linq;

namespace FinanceCalculator.Core
{
    /// <summary>
    /// Motor principal de cálculos financeiros
    /// </summary>
    public class FinanceCalculator
    {
        /// <summary>
        /// Calcula juros compostos com aportes mensais
        /// </summary>
        public InvestmentResult CalculateCompoundInterest(
            decimal initialCapital,
            decimal monthlyContribution,
            decimal annualRate,
            int months)
        {
            decimal monthlyRate = annualRate / 12m / 100m;
            decimal totalInvested = initialCapital;
            decimal totalInterest = 0m;
            decimal balance = initialCapital;

            var monthlyDetails = new List<MonthlyDetail>();

            for (int month = 1; month <= months; month++)
            {
                decimal interestForMonth = Math.Round(balance * monthlyRate, 2);
                balance += interestForMonth + monthlyContribution;
                totalInvested += monthlyContribution;
                totalInterest += interestForMonth;

                monthlyDetails.Add(new MonthlyDetail
                {
                    Month = month,
                    Balance = Math.Round(balance, 2),
                    Interest = interestForMonth,
                    TotalInvested = Math.Round(totalInvested, 2),
                    TotalInterest = Math.Round(totalInterest, 2),
                });
            }

            return new InvestmentResult
            {
                FinalBalance = Math.Round(balance, 2),
                TotalInvested = Math.Round(totalInvested, 2),
                TotalInterest = Math.Round(totalInterest, 2),
                MonthlyRate = monthlyRate,
                AnnualRate = annualRate,
                Months = months,
                MonthlyDetails = monthlyDetails,
            };
        }

        /// <summary>
        /// Calcula tabela de amortização SAC
        /// </summary>
        public AmortizationResult CalculateSAC(
            decimal loanAmount, decimal annualRate, int months)
        {
            decimal monthlyRate = annualRate / 12m / 100m;
            decimal amortization = Math.Round(loanAmount / months, 2);
            decimal balance = loanAmount;
            decimal totalPaid = 0m, totalInterest = 0m;

            var installments = new List<AmortizationInstallment>();

            for (int i = 1; i <= months; i++)
            {
                decimal interest = Math.Round(balance * monthlyRate, 2);
                decimal installment = amortization + interest;
                balance -= amortization;
                totalPaid += installment;
                totalInterest += interest;

                installments.Add(new AmortizationInstallment
                {
                    Number = i,
                    Amortization = amortization,
                    Interest = interest,
                    Installment = installment,
                    Balance = Math.Max(Math.Round(balance, 2), 0m),
                });
            }

            return new AmortizationResult
            {
                System = "SAC",
                LoanAmount = loanAmount,
                TotalPaid = Math.Round(totalPaid, 2),
                TotalInterest = Math.Round(totalInterest, 2),
                Installments = installments,
            };
        }

        /// <summary>
        /// Calcula tabela Price (parcelas fixas)
        /// Fórmula: PMT = PV * i / (1 - (1 + i)^-n)
        /// </summary>
        public AmortizationResult CalculatePrice(
            decimal loanAmount, decimal annualRate, int months)
        {
            decimal monthlyRate = annualRate / 12m / 100m;
            decimal denominator = 1m - (decimal)Math.Pow(
                (double)(1m + monthlyRate), -months
            );
            decimal installment = Math.Round(
                loanAmount * monthlyRate / denominator, 2
            );

            decimal balance = loanAmount;
            decimal totalPaid = 0m, totalInterest = 0m;
            var installments = new List<AmortizationInstallment>();

            for (int i = 1; i <= months; i++)
            {
                decimal interest = Math.Round(balance * monthlyRate, 2);
                decimal amortization = installment - interest;
                balance -= amortization;
                totalPaid += installment;
                totalInterest += interest;

                installments.Add(new AmortizationInstallment
                {
                    Number = i,
                    Amortization = Math.Max(amortization, 0m),
                    Interest = interest,
                    Installment = installment,
                    Balance = Math.Max(Math.Round(balance, 2), 0m),
                });
            }

            return new AmortizationResult
            {
                System = "PRICE",
                LoanAmount = loanAmount,
                TotalPaid = Math.Round(totalPaid, 2),
                TotalInterest = Math.Round(totalInterest, 2),
                Installments = installments,
            };
        }

        /// <summary>
        /// Converte taxa de juros entre periodicidades
        /// </summary>
        public decimal ConvertInterestRate(
            decimal rate, string fromPeriod, string toPeriod)
        {
            // Converte para taxa anual
            decimal annualRate = fromPeriod.ToLower() switch
            {
                "diaria" => (decimal)Math.Pow((double)(1m + rate / 100m), 252) - 1m,
                "mensal" => (decimal)Math.Pow((double)(1m + rate / 100m), 12) - 1m,
                "trimestral" => (decimal)Math.Pow((double)(1m + rate / 100m), 4) - 1m,
                "semestral" => (decimal)Math.Pow((double)(1m + rate / 100m), 2) - 1m,
                "anual" => rate / 100m,
                _ => throw new ArgumentException($"Periodicidade '{fromPeriod}' não suportada"),
            };

            // Converte para a periodicidade desejada
            return Math.Round(toPeriod.ToLower() switch
            {
                "diaria" => ((decimal)Math.Pow((double)(1m + annualRate), 1.0 / 252) - 1m) * 100m,
                "mensal" => ((decimal)Math.Pow((double)(1m + annualRate), 1.0 / 12) - 1m) * 100m,
                "trimestral" => ((decimal)Math.Pow((double)(1m + annualRate), 1.0 / 4) - 1m) * 100m,
                "semestral" => ((decimal)Math.Pow((double)(1m + annualRate), 1.0 / 2) - 1m) * 100m,
                "anual" => annualRate * 100m,
                _ => throw new ArgumentException($"Periodicidade '{toPeriod}' não suportada"),
            }, 4);
        }
    }

    // ===== Modelos de Dados =====
    public class InvestmentResult
    {
        public decimal FinalBalance { get; set; }
        public decimal TotalInvested { get; set; }
        public decimal TotalInterest { get; set; }
        public decimal MonthlyRate { get; set; }
        public decimal AnnualRate { get; set; }
        public int Months { get; set; }
        public List<MonthlyDetail> MonthlyDetails { get; set; }
    }

    public class MonthlyDetail
    {
        public int Month { get; set; }
        public decimal Balance { get; set; }
        public decimal Interest { get; set; }
        public decimal TotalInvested { get; set; }
        public decimal TotalInterest { get; set; }
    }

    public class AmortizationResult
    {
        public string System { get; set; }
        public decimal LoanAmount { get; set; }
        public decimal TotalPaid { get; set; }
        public decimal TotalInterest { get; set; }
        public List<AmortizationInstallment> Installments { get; set; }
    }

    public class AmortizationInstallment
    {
        public int Number { get; set; }
        public decimal Amortization { get; set; }
        public decimal Interest { get; set; }
        public decimal Installment { get; set; }
        public decimal Balance { get; set; }
    }
}`,
    },
    {
      name: "calculator.js",
      language: "javascript",
      content: `/**
 * Calculadora Financeira - Interface Web
 * Lógica de frontend com validações e formatação
 */

const FinanceFormatter = {
  currency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency', currency: 'BRL', minimumFractionDigits: 2,
    }).format(value);
  },

  percent(value, decimals = 2) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent', minimumFractionDigits: decimals,
    }).format(value / 100);
  },

  number(value) {
    return new Intl.NumberFormat('pt-BR').format(value);
  },
};

// ===== Cálculo de Juros Compostos =====
function calcularJurosCompostos() {
  const capital = parseFloat(document.getElementById('capitalInicial').value);
  const aporte = parseFloat(document.getElementById('aporteMensal').value);
  const taxa = parseFloat(document.getElementById('taxaJuros').value);
  const meses = parseInt(document.getElementById('periodoMeses').value);

  if (!validarCampos({ capital, aporte, taxa, meses })) return;

  const taxaMensal = taxa / 100 / 12;
  let saldo = capital;
  let totalInvestido = capital;
  let totalJuros = 0;
  const dadosGrafico = [];

  for (let i = 1; i <= meses; i++) {
    const jurosMes = saldo * taxaMensal;
    saldo += jurosMes + aporte;
    totalInvestido += aporte;
    totalJuros += jurosMes;
    dadosGrafico.push({ mes: i, saldo: Math.round(saldo * 100) / 100 });
  }

  exibirResultado('resultadoJuros', {
    'Saldo Final': FinanceFormatter.currency(saldo),
    'Total Investido': FinanceFormatter.currency(totalInvestido),
    'Total em Juros': FinanceFormatter.currency(totalJuros),
    'Rentabilidade': FinanceFormatter.percent(
      ((saldo - totalInvestido) / totalInvestido) * 100
    ),
  });

  renderGraficoLinha('graficoJuros', dadosGrafico);
}

// ===== Cálculo de Amortização =====
function calcularAmortizacao() {
  const valor = parseFloat(document.getElementById('valorEmprestimo').value);
  const taxa = parseFloat(document.getElementById('taxaAnual').value);
  const meses = parseInt(document.getElementById('prazoMeses').value);
  const sistema = document.getElementById('sistemaAmortizacao').value;

  if (!validarCampos({ valor, taxa, meses })) return;

  const taxaMensal = taxa / 100 / 12;
  let saldo = valor;
  const parcelas = [];

  if (sistema === 'sac') {
    const amortizacao = Math.round((valor / meses) * 100) / 100;
    for (let i = 1; i <= meses; i++) {
      const juros = Math.round(saldo * taxaMensal * 100) / 100;
      const parcela = amortizacao + juros;
      saldo = Math.max(saldo - amortizacao, 0);
      parcelas.push({ numero: i, amortizacao, juros, parcela, saldo: Math.round(saldo * 100) / 100 });
    }
  } else {
    const denominador = 1 - Math.pow(1 + taxaMensal, -meses);
    const parcela = Math.round((valor * taxaMensal / denominador) * 100) / 100;
    for (let i = 1; i <= meses; i++) {
      const juros = Math.round(saldo * taxaMensal * 100) / 100;
      const amortizacao = parcela - juros;
      saldo = Math.max(saldo - amortizacao, 0);
      parcelas.push({ numero: i, amortizacao: Math.max(amortizacao, 0), juros, parcela, saldo: Math.round(saldo * 100) / 100 });
    }
  }

  renderTabelaAmortizacao('tabelaAmortizacao', parcelas, sistema);
}

// ===== Validação =====
function validarCampos(campos) {
  const erros = Object.entries(campos).filter(([, v]) => isNaN(v) || v === '' || v <= 0);
  if (erros.length > 0) {
    mostrarErro('Preencha todos os campos com valores válidos');
    return false;
  }
  return true;
}

function mostrarErro(mensagem) {
  const toast = document.getElementById('errorToast');
  toast.textContent = mensagem;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== Exportação =====
function exportarPDF() {
  html2pdf().set({
    margin: 10,
    filename: 'calculo-financeiro.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, backgroundColor: '#0f1117' },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  }).from(document.getElementById('resultadosArea')).save();
}

// ===== Event Listeners =====
document.getElementById('btnCalcularJuros')?.addEventListener('click', calcularJurosCompostos);
document.getElementById('btnCalcularAmortizacao')?.addEventListener('click', calcularAmortizacao);
document.getElementById('btnExportarPDF')?.addEventListener('click', exportarPDF);`,
    },
  ],
};