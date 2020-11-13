package br.com.myreserve.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.myreserve.entities.Logins;
import br.com.myreserve.repositories.LoginsRepository;

@Service
public class UserOrEstabService {
	
	@Autowired
	LoginsRepository loginsRepository;
	
	public String verificaUserOrEstab(String email) throws Exception{
		Logins login = loginsRepository.findByEmail(email)
				.orElseThrow(() -> new IllegalAccessException());
		
		if(login.getIdUsuario() != null) {
			return "USER";
		}else {
			return "ESTAB";
		}
	}
}
