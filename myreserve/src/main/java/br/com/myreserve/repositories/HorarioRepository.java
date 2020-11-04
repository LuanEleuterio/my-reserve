package br.com.myreserve.repositories;

import org.springframework.data.repository.CrudRepository;

import br.com.myreserve.entities.Horario;

public interface HorarioRepository extends CrudRepository<Horario, Integer>{

	Horario findOneByCodigo(int id_horario);

}
