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
import javafx.stage.Stage;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;

public class GateTestController extends FXController{
	
	@FXML
	private TextField userIdIn;
	
	@FXML
	private Button swipeBtn;
	
	@FXML
	private Label errorLabel;
	
	
	private GateData gateData;
	
	public void setGateData(GateData data) {
		this.gateData = data;
	}
	
	@FXML
	public void swipe() {
		System.out.println(errorLabel.getText());
		if (!userIdIn.getText().equals("")) {
			ServerConnection con = (ServerConnection)ServiceLocator.getInstance().getService("serverConnection");
			errorLabel.setText(con.notifySwipe(userIdIn.getText(), this.gateData.getType()));
			
		} else 
			errorLabel.setText("Enter user id");
		
	}
	
	@Override 
	public void update() {
		
	}
}
