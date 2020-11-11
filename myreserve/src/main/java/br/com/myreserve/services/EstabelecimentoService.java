package br.com.myreserve.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.myreserve.entities.Estabelecimento;
import br.com.myreserve.exceptions.SenhaInvalidaException;
import br.com.myreserve.repositories.EstabelecimentoRepository;

@Service
public class EstabelecimentoService implements UserDetailsService{
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	EstabelecimentoRepository estabelecimentoRepository;
	
	public UserDetails autenticar(Estabelecimento estab) {
		UserDetails user = loadUserByUsername(estab.getEmail());
		boolean senhaConferem = encoder.matches(estab.getSenha(), user.getPassword());
		
		if(senhaConferem) {
			return user;
		}
		
		throw new SenhaInvalidaException();
	}
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
		Estabelecimento estabelecimento = estabelecimentoRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Email não encontrado!"));
		
		String[] roles = estabelecimento.getEstab_ativo() ? new String[] {"ESTABELECIMENTO"} : new String[] {"ESTABELECIMENTO"};
		
		return User
				.builder()
				.username(estabelecimento.getEmail())
				.password(estabelecimento.getSenha())
				.roles(roles)
				.build();
	}
		
}
