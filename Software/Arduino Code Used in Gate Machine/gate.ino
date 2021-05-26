const char VALID_RESPOND = '0';
const int PIEZO = 3;
const int LED_RED_ = 7;
const int LED_GREEN_ = 6;
const int BTN_1 = 8;
const int BTN_2 = 9;

void setup() {
  pinMode(LED_GREEN_, OUTPUT); 
  pinMode(LED_RED_, OUTPUT); 
  pinMode(BTN_1, INPUT);
  pinMode(BTN_2, INPUT);
  pinMode (PIEZO, OUTPUT);
  Serial.begin(9600); // opens serial port, sets data rate to 9600 bps
}

void loop() {

    if(digitalRead(BTN_1) == HIGH) {
      Serial.print("user001");
//      delay(1000); 
        
    }else if(digitalRead(BTN_2) == HIGH) {
      Serial.print("user002");
//      delay(1000);    
    
    }
    else
      return;
    
    while (!Serial.available()); 
     
    char res = (char)Serial.read();

    if (res == VALID_RESPOND){      
      digitalWrite(LED_RED_, LOW);
      digitalWrite(LED_GREEN_, HIGH);
      tone(PIEZO, 2000, 500);
      delay(2000);
      digitalWrite(LED_GREEN_, LOW);// sets the digital pin 13 on
      
      
    }else{
      digitalWrite(LED_GREEN_, LOW);
      digitalWrite(LED_RED_, HIGH); 
      win();
      delay(2000);
      digitalWrite(LED_RED_, LOW);   
      
    }  
}

void win() {
  tone(PIEZO,500,200);
  delay(200);
  tone(PIEZO,500,200);
  delay(200);
  tone(PIEZO,500,200);
  delay(200);
  tone(PIEZO,800,150);
  delay(150);
  tone(PIEZO,500,500);  
}
