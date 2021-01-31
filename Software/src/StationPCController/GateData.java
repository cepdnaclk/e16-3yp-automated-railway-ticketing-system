package StationPCController;

import java.io.Serializable;
import java.util.ArrayList;


@SuppressWarnings("serial")
public class GateData implements Serializable {
	private int id;
	private String type;	// 'EXIT' or'ENTRANCE'
	private String name;
	
	private static ArrayList<GateData> gateDataList;
	
	public GateData() {
		
	}
	
//	public static GateData getGateDataById(int id) {
//		try {
//			return gateDataList.get(id);
//			
//		} catch (IndexOutOfBoundsException e) {
//			System.out.println("Gate id " + id + " not valid.");
//		}
//		
//		return null;
//	}
//	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
