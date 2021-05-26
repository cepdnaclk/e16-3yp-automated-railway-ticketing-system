package StationPCController.ServiceLocator;

import java.util.HashMap;

public class ServiceLocator {
	
	private HashMap<String, Service> services;
	private static ServiceLocator instance;
	
	public static ServiceLocator getInstance() {
		if (instance == null)
			instance = new ServiceLocator();
			
		return instance;
	}
	
	private ServiceLocator() {
		this.services = new HashMap<String, Service>();
	}
	
	public <T extends Service> T getService(String id) {
		return (T)services.get(id);
	}
	
	public void addService(String key, Service service) {
		this.services.put(key, service);
	}
}
