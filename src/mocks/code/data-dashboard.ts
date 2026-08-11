import type { ProjectCode } from "./types";

export const dataDashboardCode: ProjectCode = {
  slug: "data-dashboard",
  title: "Dashboard de Análise de Dados",
  files: [
    {
      name: "analyzer.py",
      language: "python",
      content: `"""
Dashboard Analytics Engine
Processamento e análise de dados para dashboard interativo
"""

import json
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

import pandas as pd
import numpy as np


@dataclass
class MetricsSummary:
    total_records: int = 0
    avg_value: float = 0.0
    min_value: float = 0.0
    max_value: float = 0.0
    std_dev: float = 0.0
    growth_rate: float = 0.0
    trend: str = "stable"
    top_categories: list = field(default_factory=list)


class DataAnalyzer:
    """Motor principal de análise de dados"""

    def __init__(self, data_source: str = "sales_data.csv"):
        self.data_source = data_source
        self.df: Optional[pd.DataFrame] = None
        self._cache = {}

    def load_data(self) -> pd.DataFrame:
        """Carrega e pré-processa os dados"""
        self.df = pd.read_csv(self.data_source, parse_dates=["date"])
        self.df["month"] = self.df["date"].dt.to_period("M")
        self.df["weekday"] = self.df["date"].dt.day_name()
        self._clean_data()
        return self.df

    def _clean_data(self) -> None:
        """Remove duplicatas, preenche nulos, remove outliers"""
        self.df = self.df.drop_duplicates()
        self.df["category"] = self.df["category"].fillna("Sem categoria")
        self.df["value"] = self.df["value"].fillna(0.0)

        # Remove outliers via IQR
        q1 = self.df["value"].quantile(0.25)
        q3 = self.df["value"].quantile(0.75)
        iqr = q3 - q1
        self.df = self.df[
            (self.df["value"] >= q1 - 1.5 * iqr)
            & (self.df["value"] <= q3 + 1.5 * iqr)
        ]

    def compute_summary(self) -> MetricsSummary:
        """Calcula resumo completo de métricas"""
        if self.df is None or self.df.empty:
            return MetricsSummary()

        values = self.df["value"]
        summary = MetricsSummary(
            total_records=len(self.df),
            avg_value=round(float(values.mean()), 2),
            min_value=round(float(values.min()), 2),
            max_value=round(float(values.max()), 2),
            std_dev=round(float(values.std()), 2),
        )

        # Taxa de crescimento mensal
        monthly = self.df.groupby("month")["value"].sum()
        if len(monthly) >= 2:
            current, previous = monthly.iloc[-1], monthly.iloc[-2]
            summary.growth_rate = round(
                ((current - previous) / previous) * 100, 1
            )

        # Tendência via regressão linear simples
        x = np.arange(len(self.df))
        y = self.df["value"].values
        slope = np.polyfit(x, y, 1)[0]
        if slope > 0.05:
            summary.trend = "upward"
        elif slope < -0.05:
            summary.trend = "downward"

        # Top 5 categorias
        summary.top_categories = (
            self.df.groupby("category")["value"]
            .sum().nlargest(5).to_dict()
        )
        return summary

    def get_time_series(self, freq: str = "M", metric: str = "sum") -> dict:
        """Série temporal para gráficos"""
        if self.df is None:
            return {"labels": [], "values": []}

        grouped = self.df.set_index("date").resample(freq)
        metric_map = {"sum": "sum", "avg": "mean", "count": "count"}
        series = grouped["value"].agg(metric_map.get(metric, "sum"))

        return {
            "labels": [d.strftime("%Y-%m-%d") for d in series.index],
            "values": [round(float(v), 2) for v in series.values],
        }

    def get_category_breakdown(self) -> dict:
        """Distribuição por categoria para gráfico de pizza"""
        if self.df is None:
            return {"labels": [], "values": []}
        breakdown = self.df.groupby("category")["value"].sum()
        return {
            "labels": breakdown.index.tolist(),
            "values": [round(float(v), 2) for v in breakdown.values],
        }

    def export_report(self, fmt: str = "json") -> str:
        """Exporta relatório completo"""
        summary = self.compute_summary()
        report = {
            "generated_at": datetime.now().isoformat(),
            "summary": {
                "total_records": summary.total_records,
                "avg_value": summary.avg_value,
                "growth_rate": summary.growth_rate,
                "trend": summary.trend,
                "top_categories": summary.top_categories,
            },
            "time_series": self.get_time_series(),
            "categories": self.get_category_breakdown(),
        }
        if fmt == "csv":
            return self.df.to_csv(index=False)
        return json.dumps(report, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    analyzer = DataAnalyzer("sales_data.csv")
    analyzer.load_data()
    summary = analyzer.compute_summary()

    print("=" * 50)
    print("DASHBOARD ANALYTICS REPORT")
    print("=" * 50)
    print(f"Total registros: {summary.total_records}")
    print(f"Valor médio: R$ {summary.avg_value:,.2f}")
    print(f"Crescimento: {summary.growth_rate}%")
    print(f"Tendência: {summary.trend}")
    print("\\nTop 5 categorias:")
    for cat, val in summary.top_categories.items():
        print(f"  • {cat}: R$ {val:,.2f}")`,
    },
    {
      name: "dashboard.js",
      language: "javascript",
      content: `/**
 * Dashboard Interativo - Visualização de Dados
 * Gráficos dinâmicos com Chart.js
 */

// ===== Configuração dos Gráficos =====
const chartConfigs = {
  revenue: {
    type: 'line',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#5f6368', font: { size: 11 } },
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: {
            color: '#5f6368',
            font: { size: 11 },
            callback: (val) => 'R$ ' + formatNumber(val),
          },
          beginAtZero: false,
        },
      },
    },
  },
  categories: {
    type: 'doughnut',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#9aa0a6',
            padding: 16,
            usePointStyle: true,
            font: { size: 11 },
          },
        },
      },
    },
  },
};

// ===== Estado =====
let revenueChart = null;
let categoryChart = null;

async function initDashboard() {
  showLoading();
  try {
    const data = await fetchDashboardData();
    renderKPIs(data.summary);

    revenueChart = createChart('revenueChart', {
      ...chartConfigs.revenue,
      data: {
        labels: data.timeSeries.labels,
        datasets: [{
          label: 'Receita',
          data: data.timeSeries.values,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 6,
        }],
      },
    });

    categoryChart = createChart('categoryChart', {
      ...chartConfigs.categories,
      data: {
        labels: data.categories.labels,
        datasets: [{
          data: data.categories.values,
          backgroundColor: [
            '#6366f1', '#818cf8', '#a78bfa',
            '#c4b5fd', '#34d399', '#fbbf24',
          ],
          borderWidth: 0,
        }],
      },
    });

    setupFilters();
    hideLoading();
  } catch (error) {
    showError('Falha ao carregar dados do dashboard');
    console.error(error);
  }
}

// ===== API =====
async function fetchDashboardData(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const url = '/api/dashboard' + (params ? '?' + params : '');
  const response = await fetch(url);
  if (!response.ok) throw new Error('API Error: ' + response.status);
  return response.json();
}

// ===== Renderização =====
function renderKPIs(summary) {
  const fmt = (val) => new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL', minimumFractionDigits: 0,
  }).format(val);

  document.getElementById('kpiRevenue').textContent = fmt(summary.avg_value);
  document.getElementById('kpiRecords').textContent = formatNumber(summary.total_records);

  const growthEl = document.getElementById('kpiGrowth');
  growthEl.textContent = summary.growth_rate + '%';
  growthEl.className = 'kpi-value ' + (
    summary.growth_rate > 0 ? 'positive' : 'negative'
  );
}

function createChart(canvasId, config) {
  const existing = Chart.getChart(canvasId);
  if (existing) existing.destroy();
  const ctx = document.getElementById(canvasId).getContext('2d');
  return new Chart(ctx, config);
}

// ===== Utilitários =====
function formatNumber(num) {
  return new Intl.NumberFormat('pt-BR').format(num);
}
function showLoading() {
  document.getElementById('loadingOverlay').classList.add('visible');
}
function hideLoading() {
  document.getElementById('loadingOverlay').classList.remove('visible');
}
function showError(msg) {
  const toast = document.getElementById('errorToast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

function setupFilters() {
  document.getElementById('periodFilter').addEventListener('change', async () => {
    const newData = await fetchDashboardData({
      period: document.getElementById('periodFilter').value,
    });
    updateCharts(newData);
  });
}

document.addEventListener('DOMContentLoaded', initDashboard);`,
    },
  ],
};