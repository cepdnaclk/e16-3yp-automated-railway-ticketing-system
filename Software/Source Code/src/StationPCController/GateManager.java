package StationPCController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import StationPCController.ServiceLocator.Service;
import StationPCController.ServiceLocator.ServiceLocator;
import javafx.scene.layout.VBox;

public class GateManager implements Service {
	
	private HashMap<Integer, GateViewController> gateControllers;
	private int nextId;
	public VBox gateViewVbox;
	
	public GateManager(VBox gateViewVbox) {
		this.gateControllers = new HashMap<Integer, GateViewController>();
		this.nextId = ((UserConfigs)ServiceLocator.getInstance().getService("configs")).getNextId();
		this.gateViewVbox = gateViewVbox;
	}
	
	public int createNewGate(String name, String type) {
		if (type == "ENTRANCE" || type == "EXIT") {
			GateData gd = new GateData();
			gd.setId(nextId);
			gd.setName(name);
			gd.setType(type);			
			addGate(gd, nextId);
			FXController.getController("main").update();
			return nextId++;
		}
		return -1;
	}
	
	public void addGate(GateData data, int id) {
		GateViewController gvc = new GateViewController(data);
		this.gateControllers.put(Integer.valueOf(id), gvc);
		gateViewVbox.getChildren().add(gvc);	
	}
	
	public GateViewController getGateController(int id) {
		return gateControllers.get(Integer.valueOf(id));
	}
	
	public void updateGateView(int gateId) {
		try {
			gateControllers.get(Integer.valueOf(gateId)).update();
			
		} catch (NullPointerException e) {
			e.printStackTrace();
		}
	}
	
	public void saveGates(String filePath) {
		ArrayList<GateData> dataList = new ArrayList<GateData>();
		
		for (Map.Entry<Integer, GateViewController> e : gateControllers.entrySet()) {
			GateData data = e.getValue().getGateData();
			dataList.add(data);
		}
		
		Utils.writeObjectToFile(dataList, filePath);
		((UserConfigs)ServiceLocator.getInstance().getService("configs")).setNextId(nextId);
	}
	
	public void loadGates(String filePath) {
		try {
			@SuppressWarnings("unchecked")
			ArrayList<GateData> dataList = (ArrayList<GateData>)Utils.readObjectFromFile(filePath);
			
			for (GateData data : dataList) {
				addGate(data, data.getId());
			}
		} catch (NullPointerException e) {
			System.out.println("no saved gate data");
		}
	}
	
	public void deleteGate(int id) {
		GateViewController gvc = gateControllers.get(id);
		gateViewVbox.getChildren().remove(gvc);
		gateControllers.remove(Integer.valueOf(id));
		FXController.getController("main").update();
	}
	
	public int getNextId() {
		return this.nextId;
	}
	
	public int getGateCount() {
		return gateControllers.size();
	}
}
