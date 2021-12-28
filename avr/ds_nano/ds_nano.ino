/*
  laserpointer
  This code is made to handle two pan/tilt modules and lasers attached
  to them.
  To change the rotation angles and laser behaviour user must send 
  serial commands like this:
  {
    turrets: [
      { 
        base:0,
        top:0,
        laser: false
      }, 
      { 
        base:90,
        top:90,
        laser: true
      },
    ]
  } 

  Serialized version:
  {turrets:[{base:45,top:90,laser:false},{base:135,top:180,laser:true}]} 
  {turrets:[{base:45,top:90,laser:false},{base:135,top:180,laser:true}]} 
  {turrets:[{base:0,top:0,laser:false},{base:0,top:0,laser:0}]} 
*/

#include <Servo.h>
#include <ArduinoJson.h>

#define led 13

#define s1base 3
#define s1top 4
#define s1laser 5

#define s2base 10
#define s2top 11
#define s2laser 12

#define jsonBufferSize 200
char jsonBuffer[jsonBufferSize];
int json_i = 0;

Servo servo1base;
Servo servo1top;
Servo servo2base;
Servo servo2top;

StaticJsonDocument<jsonBufferSize> doc;

volatile int base1 = 90;
volatile int top1 = 90;
volatile int laser1 = 0;
volatile int base2 = 90;
volatile int top2 = 90;
volatile int laser2 = 0;

volatile bool flagProcessed = false;
volatile bool flagRead = false;

void getJson(char c)
{
  jsonBuffer[json_i] = c;
  json_i++;
  if (json_i > jsonBufferSize)
    json_i = 0;
  if ((json_i >= 2) && ((c == '\n') || (c == '\r')))
  {
    jsonBuffer[json_i] = '\0';
    if (memcmp(jsonBuffer, "read", 4) == 0)
    {
      flagRead = true;
    }
    else
    {
      getValues();
    }
    clearBuffer();
  }
}

void clearBuffer()
{
  json_i = 0;
  for (int i = 0; i < jsonBufferSize; i++)
    jsonBuffer[i] = 0;
}

void getValues()
{
  DeserializationError error = deserializeJson(doc, jsonBuffer);

  if (error)
  {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.f_str());
    return;
  }
  else
  {
    base1 = doc["turrets"][0]["base"];
    top1 = doc["turrets"][0]["top"];
    laser1 = doc["turrets"][0]["laser"];
    base2 = doc["turrets"][1]["base"];
    top2 = doc["turrets"][1]["top"];
    laser2 = doc["turrets"][1]["laser"];
    flagProcessed = true;
  }
}

void setup()
{
  servo1base.attach(s1base, 500, 2500);
  servo1top.attach(s1top, 500, 2500);
  servo2base.attach(s2base);
  servo2top.attach(s2top);
  pinMode(s1laser, OUTPUT);
  pinMode(s2laser, OUTPUT);
  pinMode(led, OUTPUT);

  Serial.begin(9600);
  while (!Serial)
    continue;
  Serial.println("... start");
  // updateActuators();
}

void updateActuators()
{
  servo1base.write(base1);
  servo1top.write(top1);
  servo2base.write(base2);
  servo2top.write(top2);
  digitalWrite(s1laser, laser1);
  digitalWrite(s2laser, laser2);
}

char c;
int test = 0;

void loop()
{
  // if (Serial.available())
  //   getJson(Serial.read());
  // if (flagProcessed)
  // {
  //   updateActuators();
  //   Serial.println("... ok");
  //   flagProcessed = false;
  // }
  // if (flagRead)
  // {
  //   Serial.print("... readings: ");
  //   Serial.print(base1);
  //   Serial.print(" ");
  //   Serial.print(top1);
  //   Serial.print(" ");
  //   Serial.print(base2);
  //   Serial.print(" ");
  //   Serial.print(top2);
  //   Serial.println("");
  //   flagRead = false;
  // }
  if (Serial.available())
  {
    c = Serial.read();
    if (c == '+')
    {
      test += 15;
      servo1base.write(test);
    }
    if (c == '-')
    {
      test -= 15;
      servo1base.write(test);
    }
    Serial.println(test);
  }
}
