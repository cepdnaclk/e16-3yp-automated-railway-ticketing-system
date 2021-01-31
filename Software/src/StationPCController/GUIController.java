package StationPCController;

import StationPCController.ServiceLocator.ServiceLocator;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import javafx.fxml.FXML;
import javafx.scene.control.Label;

public class GUIController extends FXController{
	
	@FXML
	private Label stationNameLabel;
	
	@FXML
	private Button mainConfigurationBtn;
	
	@FXML
	private Label stationIdLabel;
	
	@FXML
	private AnchorPane gateViewPane;
	
	@FXML
	private VBox gateViewVbox;
	
	@FXML
	private Label gateCountLabel;
	
	@FXML
	private Label versionLabel;
	
	@Override
	public void open() {
		this.update();
		this.stage.show();
	}
	
	public void setStationName(String name) {
		stationNameLabel.setText(name);
	}

	
	public Button getMainConfigurationBtn() {
		return mainConfigurationBtn;
	}
	
	public VBox getGateViewVbox() {
		return gateViewVbox;
	}

	@Override
	public void update() {
		UserConfigs configs = ((UserConfigs)ServiceLocator.getInstance().getService("configs"));
		if (configs  != null) {
			stationNameLabel.setText(configs.getStationName());
			stationIdLabel.setText(configs.getStationId());
			int n = ((GateManager)ServiceLocator.getInstance().getService("gateManager")).getGateCount();
			gateCountLabel.setText("" + n);
		}
		
	}
	
	@FXML
	public void addGate() {
		GateConfigController gcc = FXController.getController("gateConfig");
		gcc.clear();
		gcc.open();
	}
	
	@FXML
	public void config() {
		FXController.getController("mainConfig").open(); 	
	}
		
	public void setVersion(String version) {
		versionLabel.setText(version);
	}
}
