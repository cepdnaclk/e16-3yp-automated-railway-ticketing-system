package StationPCController;

import java.util.HashMap;

import javafx.fxml.FXML;
import javafx.stage.Stage;

public abstract class FXController {
	protected Stage stage;
	
	private static HashMap<String, FXController> controllers;
	
	public abstract void update();
	
	public void open() {
		stage.show();
	}
	
	@FXML
	public void close() {
		stage.close();
	}
	
	
	public void setStage(Stage stage) {
		this.stage = stage;
	}
	
	public static <T extends FXController> T getController(String id) {
		if (controllers == null)
			controllers = new HashMap<String, FXController>();
		return (T)controllers.get(id);
	}
	
	public static void addController(FXController controller, String id) {
		if (controllers == null)
			controllers = new HashMap<String, FXController>();
		controllers.put(id, controller);
	}
}
