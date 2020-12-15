package br.com.myreserve.config;

import java.util.Arrays;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import br.com.myreserve.services.JwtService;
import br.com.myreserve.services.LoginsService;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	DataSource dataSource;
	
	@Autowired
	LoginsService loginsService;
	
	@Autowired
	JwtService jwtService;
	
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public OncePerRequestFilter jwtFilter() {
		return new JwtAuthFilter(jwtService, loginsService);
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
		.userDetailsService(loginsService)
		.passwordEncoder(passwordEncoder());
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and()
		.csrf().disable()
		.authorizeRequests()
			.antMatchers(HttpMethod.POST, "/usuario")
				.permitAll()
				.antMatchers(HttpMethod.POST, "/restaurante")
				.permitAll()
				.antMatchers(HttpMethod.POST, "/login/auth")
				.permitAll()
				.antMatchers(HttpMethod.DELETE, "/login/delete")
				.permitAll()
				.antMatchers(HttpMethod.POST, "/storage/upload")
				.permitAll()
				.antMatchers(HttpMethod.POST, "/endereco")
				.permitAll()
				.antMatchers(HttpMethod.POST, "/telefone")
				.permitAll()
				.antMatchers(HttpMethod.GET, "/categoria")
				.permitAll()
			.anyRequest().authenticated()
			.and()	
		.addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class);
	}
		

}
