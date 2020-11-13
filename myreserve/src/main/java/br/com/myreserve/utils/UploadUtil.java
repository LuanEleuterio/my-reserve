package br.com.myreserve.utils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.web.multipart.MultipartFile;

public class UploadUtil {
	public static void saveFile(String uploadDir , String fileName, MultipartFile file) throws IOException {
		Path uploadPath = Paths.get(uploadDir);
		
		if(!Files.exists(uploadPath)) {
			Files.createDirectories(uploadPath);
		}
		
		try (InputStream inputStream = file.getInputStream()){
			if(fileName.contains(".png") || fileName.contains(".jpg") || fileName.contains(".jpeg")) {
			Path filePath = uploadPath.resolve(fileName);
			Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
			}else throw new IOException();
		}catch (IOException e) {
			throw new IOException("Nao foi possivel enviar o arquivo "+ fileName , e);
		}
	}
}
