package StationPCController;

import StationPCController.ServiceLocator.ServiceLocator;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;

public class MainConfigurationController extends FXController{
		
	@FXML
	private Button saveBtn;
	
	@FXML
	private Button cancelBtn;
	
	@FXML
	private TextField stationNameIn;
	
	@FXML
	private TextField stationIdIn;
	
	@FXML
	private TextField authTokenIn;
	
	public static String configsFilePath;
	
	@Override
	public void open() {
		UserConfigs configs;
		
		if ((configs = ((UserConfigs)ServiceLocator.getInstance().getService("configs"))) 
				!= null) {
			stationNameIn.setText(configs.getStationName());
			stationIdIn.setText(configs.getStationId());
			authTokenIn.setText(configs.getAuthToken());
		}
		
		this.stage.show();
	}
	
//	public Button getCancelBtn() {
//		return cancelBtn;
//	}
//	
//	public Button getSaveBtn() {
//		return saveBtn;
//	}
//	
//	public boolean isSavePossible() {
//		boolean a = !stationNameIn.getText().isEmpty();
//		boolean b = !stationIdIn.getText().isEmpty();
//		boolean c = !authTokenIn.getText().isEmpty();
//		
//		return a && b && c;
//	}
	
	public void save() {
		UserConfigs configs = ((UserConfigs)ServiceLocator.getInstance().getService("configs"));
		
		configs.setStationName(this.stationNameIn.getText());
		configs.setStationId(this.stationIdIn.getText());
		configs.setAuthToken(this.authTokenIn.getText());
		
		
		Utils.writeObjectToFile(configs, configsFilePath);
		FXController.getController("main").update();
		this.close();
	}
	
	@Override 
	public void update() {
		
	}
}
