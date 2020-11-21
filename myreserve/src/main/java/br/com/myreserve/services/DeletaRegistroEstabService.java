package br.com.myreserve.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import br.com.myreserve.entities.Logins;
import br.com.myreserve.repositories.EnderecoRepository;
import br.com.myreserve.repositories.EstabelecimentoRepository;
import br.com.myreserve.repositories.LoginsRepository;
import br.com.myreserve.repositories.TelefoneRepository;

@Service
public class DeletaRegistroEstabService {
	
	@Autowired
	LoginsRepository loginsRepository;
	@Autowired
	EstabelecimentoRepository estabRepository;
	@Autowired
	TelefoneRepository telefoneRepository;
	@Autowired
	EnderecoRepository enderecoRepository;
	
	
	//Esse metodo deleta todos os registros do estabelecimento
	//caso aconteça alguma falha durante o cadastro
	public void deletaAllEstabelecimento(Integer id, Integer etapa) throws IllegalAccessException {
		Logins login = loginsRepository.findOneByIdEstabelecimento(id)
				.orElseThrow(() -> new IllegalAccessException());;
		
		if(etapa == 2) {
			loginsRepository.deleteById(login.getId());
			estabRepository.deleteById(id);
		}else if(etapa == 3) {
			loginsRepository.deleteById(login.getId());
			enderecoRepository.deleteByFk(id);
			estabRepository.deleteById(id);
		}
	}
}
