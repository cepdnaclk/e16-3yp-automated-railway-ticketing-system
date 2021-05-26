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
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.stage.Modality;
import javafx.stage.Stage;
import javafx.fxml.FXML;
import javafx.scene.control.Label;


public class Main extends Application {
	
	private GUIController guiController;

	private static final String version = "v0.6-demo";
	private static final String gateSaveFilePath = "data/gateData.dat";
	private static final String userConfigFilePath = "data/userconfigs.cg";
	private static final String serverUrl = "https://rts-railway.herokuapp.com/api/";
	
	
	public static void main(String[] args) {
		MainConfigurationController.configsFilePath = userConfigFilePath;

		UserConfigs userConfigs = loadConfigs();
//		System.out.println(configs);
		
		
//		UserConfigs userConfigs = new UserConfigs();
//		
//		userConfigs.setAuthToken("st01");
		userConfigs.setServerURL(serverUrl);
//		userConfigs.setStationId("station005");
//		userConfigs.setStationName("Central Station");
//		userConfigs.setNextId(1);
//		userConfigs.setAuthToken("m$x`z~6:),Ytq*wdWJ*rf[sG2-s-^/[wa!fbG7BT'sk}`gBQ/Les(T_-ZQ$9:SaVc>m4M}XS=[#'*E8DVhd.\\U,[yM5@W~hPYKRk");
		
		ServiceLocator.getInstance().addService("configs", userConfigs);
		ServiceLocator.getInstance().addService("serverConnection", new ServerConnection());
	
		launch(args);
	}
	
	
	@Override
    public void start(Stage stage) throws Exception {
		// load main stage
	    FXMLLoader loader = new FXMLLoader(getClass().getResource("fxml/MainWindow.fxml"));    
        Scene scene = new Scene(loader.load());
        stage.setScene(scene);
        guiController = loader.getController();
        guiController.setStage(stage);
        FXController.addController(guiController, "main");
        stage.setTitle("RTS");
   
        this.createSubWindow(stage, "fxml/GateConfigWindow.fxml", "Gate Configurations", "gateConfig");
        this.createSubWindow(stage, "fxml/GateTestWindow.fxml", "Swipe Card Test", "gateTest");
        this.createSubWindow(stage,  "fxml/MainConfigurationWindow.fxml", "Configurations", "mainConfig");
      
        GateManager gateManager = new GateManager(guiController.getGateViewVbox());
        ServiceLocator.getInstance().addService("gateManager", gateManager);
        gateManager.loadGates(gateSaveFilePath);
        
        guiController.setVersion(version);
        guiController.open();
            
        stage.show();
	}
	
	

	private <T extends FXController> T createSubWindow(Stage mainStage, String fxmlFilePath, String title, String id) throws IOException {
		FXMLLoader loader = new FXMLLoader(getClass().getResource(fxmlFilePath));    
        Scene scene = new Scene(loader.load());
        Stage stage = new Stage();
        T controller = loader.getController();
        controller.setStage(stage);
        
        stage.setScene(scene);
        stage.initModality(Modality.WINDOW_MODAL);
        stage.initOwner(mainStage);
              
        stage.setTitle(title);
        FXController.addController(controller, id);
        return controller;
	}
	
	
	@Override 
	public void stop() {
		((GateManager)ServiceLocator.getInstance().getService("gateManager")).saveGates(gateSaveFilePath);
		UserConfigs configs = ((UserConfigs)ServiceLocator.getInstance().getService("configs"));
		Utils.writeObjectToFile(configs, userConfigFilePath);
	}
	
	
	public static UserConfigs loadConfigs() {
		UserConfigs userConfigs = (UserConfigs)Utils.readObjectFromFile(userConfigFilePath);
		
		if (userConfigs == null) {
			userConfigs = new UserConfigs();
		}
		
		ServiceLocator.getInstance().addService("configs", userConfigs);
		
		return userConfigs;
	}

}
