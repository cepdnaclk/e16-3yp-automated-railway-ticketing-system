package StationPCController;

import java.io.IOException;

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
import javafx.stage.Stage;
import javafx.fxml.FXML;
import javafx.scene.control.Label;

public class GateViewController extends AnchorPane {
	
	@FXML
	private Label gateNameLabel;
	
	@FXML
	private Button testBtn;
	
	@FXML
	private Label typeLabel;
	
	private GateData gateData;
	

	public GateViewController(GateData gateData) {
		FXMLLoader loader = new FXMLLoader(getClass().getResource("fxml/GateView.fxml"));
        loader.setRoot(this);
        loader.setController(this);

        try {
            loader.load();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        
        this.gateData = gateData;
        this.update();
	}
	
	public Button getTestBtn() {
		return this.testBtn;
	}
	
	@FXML
	public void test() {
		GateTestController gtc = (GateTestController)FXController.getController("gateTest");
		gtc.setGateData(this.gateData);
		gtc.open();
	}
	
	public void update() {
		this.gateNameLabel.setText(gateData.getName());
        this.typeLabel.setText(gateData.getType());
	}
	
	@FXML
	public void config() {
		GateConfigController gcc = FXController.getController("gateConfig");
		gcc.setData(this.gateData);
		gcc.open();
	}
	
	@FXML
	public void delete() {
		GateManager gm = ServiceLocator.getInstance().getService("gateManager");
		gm.deleteGate(this.gateData.getId());
	}
	
	public GateData getGateData() {
		return this.gateData;
	}
}
