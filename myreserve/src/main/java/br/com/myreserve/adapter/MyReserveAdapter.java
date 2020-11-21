package br.com.myreserve.adapter;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyReserveAdapter implements WebMvcConfigurer{
	
	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
		PageableHandlerMethodArgumentResolver phmar = new PageableHandlerMethodArgumentResolver();
		
		phmar.setFallbackPageable(PageRequest.of(0, 12));
		resolvers.add(phmar);
	} 
}
