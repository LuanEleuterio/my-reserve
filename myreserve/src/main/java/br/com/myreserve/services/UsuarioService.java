package br.com.myreserve.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.myreserve.entities.Usuario;
import br.com.myreserve.exceptions.SenhaInvalidaException;
import br.com.myreserve.repositories.UsuarioRepository;

@Service
public class UsuarioService implements UserDetailsService{

	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	public UserDetails autenticar(Usuario usuario) {
		UserDetails user = loadUserByUsername(usuario.getEmail());
		boolean senhaConferem = encoder.matches(usuario.getSenha(), user.getPassword());
		
		if(senhaConferem) {
			return user;
		}
		
		throw new SenhaInvalidaException();
	}
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
		Usuario usuario = usuarioRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Email não encontrado!"));
		
		String[] roles = usuario.getUser_ativo() ? new String[] {"USUARIO"} : new String[] {"USUARIO"};
		
		return User
				.builder()
				.username(usuario.getEmail())
				.password(usuario.getSenha())
				.roles(roles)
				.build();
	}
}
