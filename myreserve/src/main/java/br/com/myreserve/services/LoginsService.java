package br.com.myreserve.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.myreserve.entities.Logins;
import br.com.myreserve.exceptions.SenhaInvalidaException;
import br.com.myreserve.repositories.LoginsRepository;

@Service
public class LoginsService implements UserDetailsService{
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	LoginsRepository loginsRepository;
	
	public UserDetails autenticar(Logins login) {
		UserDetails user = loadUserByUsername(login.getEmail());
		boolean senhaConferem = encoder.matches(login.getSenha(), user.getPassword());
		
		if(senhaConferem) {
			return user;
		}
		
		throw new SenhaInvalidaException();
	}
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
		Logins login = loginsRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Email não encontrado!"));
		
		String[] roles = login.getAtivo() ? new String[] {"ESTABELECIMENTO"} : new String[] {"ESTABELECIMENTO"};
		
		return User
				.builder()
				.username(login.getEmail())
				.password(login.getSenha())
				.roles(roles)
				.build();
	}
		
}
