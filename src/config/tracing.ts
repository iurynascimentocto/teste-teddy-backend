import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';

export function setupTracing() {
  const traceExporter = new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces',
  });

  const prometheusExporter = new PrometheusExporter({ port: 9464 }, () =>
    console.log(
      '📊 Prometheus Metrics rodando em http://localhost:9464/metrics',
    ),
  );

  const sdk = new NodeSDK({
    traceExporter,
    spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
    instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation()],
    metricReader: prometheusExporter,
  });

  sdk.start();
  console.log('🚀 OpenTelemetry Inicializado!');
}
