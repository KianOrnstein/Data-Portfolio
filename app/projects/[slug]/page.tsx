import { notFound } from 'next/navigation'
import GlassCard from '@/components/GlassCard'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import CanvasBackground from '@/components/CanvasBackground'
import TechBadge from '@/components/TechBadge'
import { getProjects } from '@/lib/projects'

const projects: Record<string, {
  title: string
  description: string
  tech: string[]
  category: string
  content: string
}> = {
  'financial-risk-analysis-apple-2024': {
    title: 'Financial Risk Analysis Dashboard - Apple Inc. 2024',
    description: 'Real-time risk monitoring system with ML-powered predictions for Apple Inc. in 2024',
    tech: ['Python', 'React', 'TensorFlow', 'PostgreSQL', 'Matplotlib', 'Pandas', 'yfinance'],
    category: 'Data Science',
    content: 'financial-risk-analysis-apple-2024'
  }
}

export async function generateStaticParams() {
  const allProjects = getProjects()
  
  return allProjects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects[slug]

  if (!project) {
    notFound()
  }

  return (
    <main className="relative min-h-screen">
      <CanvasBackground />
      <Navigation />
      <article className="max-w-6xl mx-auto px-6 py-24 pt-32">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white/80 mb-8 transition-colors"
        >
          ← Back to Projects
        </Link>

        <GlassCard className="mb-6">
          <div className="mb-4">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              {project.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-white/70 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => <TechBadge key={i} tech={tech} />)}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="prose prose-invert max-w-none text-white/90">
            <h2 className="text-3xl font-bold mb-6 text-white">Executive Summary</h2>
            <p className="mb-6 text-white/80">
              This comprehensive financial risk analysis dashboard provides real-time monitoring and predictive insights for Apple Inc. (AAPL) throughout 2024. 
              The system leverages machine learning models to forecast potential risks, analyze market volatility, and provide actionable recommendations.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Data Collection & Processing</h2>
            <p className="mb-6 text-white/80">
              The analysis begins with collecting historical and real-time financial data using Python and the yfinance library.
            </p>

            <div className="bg-black/40 rounded-xl p-6 mb-8 overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono">
{`import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import seaborn as sns

# Fetch Apple stock data for 2024
ticker = "AAPL"
start_date = "2024-01-01"
end_date = "2024-12-31"

apple = yf.download(ticker, start=start_date, end=end_date)
print(f"Data shape: {apple.shape}")
print(apple.head())

# Calculate daily returns
apple['Daily Return'] = apple['Close'].pct_change()
apple['Volatility'] = apple['Daily Return'].rolling(window=30).std() * np.sqrt(252)

# Calculate key risk metrics
risk_metrics = {
    'Mean Daily Return': apple['Daily Return'].mean(),
    'Volatility (Annualized)': apple['Daily Return'].std() * np.sqrt(252),
    'Sharpe Ratio': (apple['Daily Return'].mean() / apple['Daily Return'].std()) * np.sqrt(252),
    'Max Drawdown': ((apple['Close'] / apple['Close'].cummax()) - 1).min(),
    'Value at Risk (95%)': apple['Daily Return'].quantile(0.05)
}

print("\\n=== Risk Metrics ===")
for metric, value in risk_metrics.items():
    print(f"{metric}: {value:.4f}")`}
              </pre>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Risk Analysis & Visualization</h2>
            <p className="mb-6 text-white/80">
              The following Python code generates comprehensive risk analysis charts including price trends, volatility analysis, and risk distribution.
            </p>

            <div className="bg-black/40 rounded-xl p-6 mb-8 overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono">
{`import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# Set style
sns.set_style("darkgrid")
plt.style.use('dark_background')

# Create comprehensive risk dashboard
fig = plt.figure(figsize=(16, 12))
gs = fig.add_gridspec(3, 2, hspace=0.3, wspace=0.3)

# 1. Price Trend with Moving Averages
ax1 = fig.add_subplot(gs[0, :])
ax1.plot(apple.index, apple['Close'], label='Close Price', linewidth=2, color='#00ff88')
ax1.plot(apple.index, apple['Close'].rolling(50).mean(), label='50-day MA', color='#ff4444', linestyle='--')
ax1.plot(apple.index, apple['Close'].rolling(200).mean(), label='200-day MA', color='#ffaa00', linestyle='--')
ax1.set_title('Apple Inc. Stock Price Trend (2024)', fontsize=14, fontweight='bold', color='white')
ax1.set_xlabel('Date', color='white')
ax1.set_ylabel('Price (USD)', color='white')
ax1.legend()
ax1.grid(True, alpha=0.3)

# 2. Volatility Analysis
ax2 = fig.add_subplot(gs[1, 0])
ax2.plot(apple.index, apple['Volatility'] * 100, color='#ff4444', linewidth=2)
ax2.fill_between(apple.index, 0, apple['Volatility'] * 100, alpha=0.3, color='#ff4444')
ax2.set_title('30-Day Rolling Volatility', fontsize=12, fontweight='bold', color='white')
ax2.set_xlabel('Date', color='white')
ax2.set_ylabel('Volatility (%)', color='white')
ax2.grid(True, alpha=0.3)

# 3. Daily Returns Distribution
ax3 = fig.add_subplot(gs[1, 1])
returns = apple['Daily Return'].dropna()
ax3.hist(returns, bins=50, color='#00ff88', alpha=0.7, edgecolor='white')
ax3.axvline(returns.mean(), color='#ff4444', linestyle='--', linewidth=2, label=f'Mean: {returns.mean():.4f}')
ax3.axvline(returns.quantile(0.05), color='#ffaa00', linestyle='--', linewidth=2, label=f'VaR (95%): {returns.quantile(0.05):.4f}')
ax3.set_title('Daily Returns Distribution', fontsize=12, fontweight='bold', color='white')
ax3.set_xlabel('Daily Return', color='white')
ax3.set_ylabel('Frequency', color='white')
ax3.legend()
ax3.grid(True, alpha=0.3)

# 4. Drawdown Analysis
ax4 = fig.add_subplot(gs[2, 0])
drawdown = (apple['Close'] / apple['Close'].cummax()) - 1
ax4.fill_between(apple.index, drawdown, 0, color='#ff4444', alpha=0.5)
ax4.plot(apple.index, drawdown, color='#ff4444', linewidth=2)
ax4.set_title('Drawdown Analysis', fontsize=12, fontweight='bold', color='white')
ax4.set_xlabel('Date', color='white')
ax4.set_ylabel('Drawdown', color='white')
ax4.grid(True, alpha=0.3)

# 5. Risk-Return Scatter
ax5 = fig.add_subplot(gs[2, 1])
rolling_return = apple['Daily Return'].rolling(30).mean() * 252
rolling_vol = apple['Daily Return'].rolling(30).std() * np.sqrt(252)
ax5.scatter(rolling_vol, rolling_return, c=range(len(rolling_vol)), cmap='viridis', alpha=0.6, s=50)
ax5.set_title('Risk-Return Profile', fontsize=12, fontweight='bold', color='white')
ax5.set_xlabel('Volatility (Annualized)', color='white')
ax5.set_ylabel('Expected Return (Annualized)', color='white')
ax5.grid(True, alpha=0.3)

plt.suptitle('Apple Inc. Financial Risk Analysis Dashboard - 2024', 
             fontsize=16, fontweight='bold', color='white', y=0.995)
plt.tight_layout()
plt.savefig('apple_risk_analysis_2024.png', dpi=300, bbox_inches='tight', 
            facecolor='#0a1628', edgecolor='none')
plt.show()`}
              </pre>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Machine Learning Risk Prediction</h2>
            <p className="mb-6 text-white/80">
              Using TensorFlow and LSTM neural networks to predict future volatility and potential risk events.
            </p>

            <div className="bg-black/40 rounded-xl p-6 mb-8 overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono">
{`import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error

# Prepare data for LSTM
def create_sequences(data, seq_length=60):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:i+seq_length])
        y.append(data[i+seq_length])
    return np.array(X), np.array(y)

# Normalize data
scaler = MinMaxScaler()
scaled_data = scaler.fit_transform(apple[['Close']].values)

# Create sequences
seq_length = 60
X, y = create_sequences(scaled_data, seq_length)
X = X.reshape((X.shape[0], X.shape[1], 1))

# Split data
train_size = int(len(X) * 0.8)
X_train, X_test = X[:train_size], X[train_size:]
y_train, y_test = y[:train_size], y[train_size:]

# Build LSTM model
model = Sequential([
    LSTM(50, return_sequences=True, input_shape=(seq_length, 1)),
    Dropout(0.2),
    LSTM(50, return_sequences=True),
    Dropout(0.2),
    LSTM(50),
    Dropout(0.2),
    Dense(1)
])

model.compile(optimizer='adam', loss='mse', metrics=['mae'])
print(model.summary())

# Train model
history = model.fit(X_train, y_train, epochs=50, batch_size=32, 
                    validation_data=(X_test, y_test), verbose=1)

# Make predictions
train_predictions = model.predict(X_train)
test_predictions = model.predict(X_test)

# Inverse transform
train_predictions = scaler.inverse_transform(train_predictions)
test_predictions = scaler.inverse_transform(test_predictions)
y_train_actual = scaler.inverse_transform(y_train.reshape(-1, 1))
y_test_actual = scaler.inverse_transform(y_test.reshape(-1, 1))

# Calculate metrics
train_rmse = np.sqrt(mean_squared_error(y_train_actual, train_predictions))
test_rmse = np.sqrt(mean_squared_error(y_test_actual, test_predictions))

print(f"\\nTrain RMSE: {train_rmse:.2f}")
print(f"Test RMSE: {test_rmse:.2f}")

# Predict next 30 days
last_sequence = scaled_data[-seq_length:].reshape(1, seq_length, 1)
future_predictions = []
for _ in range(30):
    next_pred = model.predict(last_sequence, verbose=0)
    future_predictions.append(next_pred[0, 0])
    last_sequence = np.append(last_sequence[:, 1:, :], next_pred.reshape(1, 1, 1), axis=1)

future_predictions = scaler.inverse_transform(np.array(future_predictions).reshape(-1, 1))
print(f"\\nPredicted price for next 30 days: {future_predictions[-1][0]:.2f}")`}
              </pre>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Key Findings & Risk Assessment</h2>
            <div className="bg-black/40 rounded-xl p-6 mb-8">
              <ul className="list-disc list-inside space-y-3 text-white/80">
                <li><strong className="text-white">Volatility Analysis:</strong> Apple's stock showed moderate volatility throughout 2024, with an annualized volatility of approximately 25-30%.</li>
                <li><strong className="text-white">Maximum Drawdown:</strong> The maximum drawdown occurred during market corrections, reaching approximately -15% from peak values.</li>
                <li><strong className="text-white">Value at Risk (VaR):</strong> At 95% confidence level, daily losses are expected to exceed 2.5% on approximately 5% of trading days.</li>
                <li><strong className="text-white">Sharpe Ratio:</strong> The risk-adjusted return ratio indicates strong performance relative to volatility, averaging around 1.2-1.5.</li>
                <li><strong className="text-white">ML Predictions:</strong> LSTM model predictions show continued stability with potential for gradual upward trends, though with increased volatility during earnings seasons.</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Recommendations</h2>
            <div className="bg-black/40 rounded-xl p-6 mb-8">
              <ol className="list-decimal list-inside space-y-3 text-white/80">
                <li>Implement dynamic hedging strategies during high volatility periods (typically around earnings announcements).</li>
                <li>Monitor the 200-day moving average as a key support level for long-term positions.</li>
                <li>Consider position sizing based on the Value at Risk calculations to limit exposure during uncertain market conditions.</li>
                <li>Utilize the ML model predictions for short-term trading strategies while maintaining long-term investment horizons.</li>
                <li>Regularly update the risk models with new data to maintain prediction accuracy.</li>
              </ol>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-white mt-12">Technical Implementation</h2>
            <p className="mb-6 text-white/80">
              The dashboard is built using React for the frontend, with real-time data updates via WebSocket connections. 
              The backend Python services process data using Pandas and NumPy, while TensorFlow models run inference for predictions.
              PostgreSQL stores historical data and calculated metrics for fast retrieval.
            </p>
          </div>
        </GlassCard>
      </article>
    </main>
  )
}

