package StationPCController;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class Utils {
	
	public static void writeObjectToFile(Object serObj, String filePath) {
		 
        try {
        	
            FileOutputStream fileOut = new FileOutputStream(filePath);
            ObjectOutputStream objectOut = new ObjectOutputStream(fileOut);
            objectOut.writeObject(serObj);
            objectOut.close();
            
 
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
	
	public static Object readObjectFromFile(String filePath) {
		try {
			FileInputStream fs = new FileInputStream(filePath);
			ObjectInputStream os = new ObjectInputStream(fs);
			Object object =  os.readObject();
			
			os.close();
			return object;
			
		}  catch (IOException e) {
            e.printStackTrace();
            
        } catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return null;
	}
}
