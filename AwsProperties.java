package com.fooddelivaryapp.fooddelivary.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;


@Getter
@Setter

@ConfigurationProperties(prefix = "aws")
public class AwsProperties {

    private String region;
    private S3 s3;

    @Getter
    @Setter
    public static class S3 {
        private String bucket;
    }
}
