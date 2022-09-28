package com.yuti.mainserver.global.config;

import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import javax.websocket.RemoteEndpoint;

@EnableElasticsearchRepositories
@Configuration
public class ElasticSearchConfig extends AbstractElasticsearchConfiguration {

    @Value("${es.host}")
    private String host;

    @Value("${es.id}")
    private String id;

    @Value("${es.password}")
    private String pw;

    private final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();

    @Override
    public RestHighLevelClient elasticsearchClient() {
        credentialsProvider.setCredentials(AuthScope.ANY,
                new UsernamePasswordCredentials(id, pw));

        return new RestHighLevelClient(RestClient.builder(new HttpHost(host, 9200))
                .setHttpClientConfigCallback(new RestClientBuilder.HttpClientConfigCallback() {
                    @Override
                    public HttpAsyncClientBuilder customizeHttpClient(HttpAsyncClientBuilder httpClientBuilder) {
                        return httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider);
                    }
                }));
    }

}
