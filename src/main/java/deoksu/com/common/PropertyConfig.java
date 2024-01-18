package deoksu.com.common;

import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.nio.charset.StandardCharsets;

@Configuration
public class PropertyConfig {

    @Bean
    public PropertiesFactoryBean properties() throws Exception{
        PropertiesFactoryBean propertyFactoryBean = new PropertiesFactoryBean();
        ClassPathResource classPathResource = new ClassPathResource("application.properties");

        propertyFactoryBean.setLocation(classPathResource);
        propertyFactoryBean.setFileEncoding(StandardCharsets.UTF_8.toString());

        return propertyFactoryBean;
    }
}
