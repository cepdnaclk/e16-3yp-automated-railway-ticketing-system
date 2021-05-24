package StationPCController;

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
import javafx.scene.control.RadioButton;
import javafx.scene.control.TextField;
import javafx.scene.control.Toggle;
import javafx.scene.control.ToggleGroup;
import com.gluonhq.charm.glisten.control.ToggleButtonGroup;

import StationPCController.ServiceLocator.ServiceLocator;


public class GateConfigController extends FXController{
	
	@FXML
	private Button saveBtn;
	
	@FXML
	private Button cancelBtn;
	
	@FXML
	private TextField nameIn;
	
	@FXML
	private Label idLabel;
	
	@FXML
	private ToggleButtonGroup typeToggleGroup;
	
	@FXML
	private RadioButton entranceRadio;
	
	@FXML
	private RadioButton exitRadio;
	
	private boolean addNew = false;
	
	private GateData currentGateData;
	

	
	public void setData(GateData data) {
		currentGateData = data;
		nameIn.setText(data.getName());
		idLabel.setText("" + data.getId());
		
		if (data.getType().equals("ENTRANCE"))
			entranceRadio.setSelected(true);
		
		else 
			exitRadio.setSelected(true);
		
		this.addNew = false;
	}
	
	public void clear() {
		nameIn.clear();
		
		GateManager gm = ServiceLocator.getInstance().getService("gateManager");
		idLabel.setText("" + gm.getNextId());
		entranceRadio.setSelected(true);
		currentGateData = null;
		this.addNew = true;
	}
	
	public void cancel() {
		this.close();
	}
	
	public void save() {
		if (this.currentGateData != null) {
			this.currentGateData.setName(nameIn.getText());
			
			if (this.entranceRadio.isSelected())
				currentGateData.setType("ENTRANCE");
			
			else 
				currentGateData.setType("EXIT");
			
			((GateManager)(ServiceLocator.getInstance().getService("gateManager")))
					.updateGateView(currentGateData.getId());
			
			this.close();
			
		} else {
			
			if (!this.nameIn.getText().isEmpty()) {
				GateManager gm = ServiceLocator.getInstance().getService("gateManager");		
				String type = "ENTRANCE";
				
				if (this.exitRadio.isSelected()) 
					type = "EXIT";
				
				gm.createNewGate(this.nameIn.getText(), type);
				this.close();
			}
		}
		
		
	}
	
	@Override 
	public void update() {
		
	}
}
