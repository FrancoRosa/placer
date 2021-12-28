#include "ax12.h" //ax12 library allows to send DYNAMIXEL commands
#include <ArduinoJson.h>

#define jsonBufferSize 200
#define base1Id 1
#define top1Id 2
#define base2Id 3
#define top2Id 4

volatile int base1 = 90;
volatile int top1 = 90;
volatile int laser1 = 0;
volatile int base2 = 90;
volatile int top2 = 90;
volatile int laser2 = 0;

char jsonBuffer[jsonBufferSize];
int json_i = 0;

StaticJsonDocument<jsonBufferSize> doc;

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

void updateActuators()
{
  dxlSetGoalPosition(base1Id, base1);
  dxlSetGoalPosition(top1Id, top1);
  dxlSetGoalPosition(base2Id, base2);
  dxlSetGoalPosition(top2Id, top2);
}

void setup()
{
  Serial.begin(9600);
  while (!Serial)
    continue;
  Serial.println("... start");
  updateActuators();
}

void delayS(int s)
{
  while (s > 0)
  {
    delay(1000);
    s--;
  }
}

void loop()
{
  if (Serial.available())
    getJson(Serial.read());
  if (flagProcessed)
  {
    updateActuators();
    Serial.println("... ok");
    flagProcessed = false;
  }
  if (flagRead)
  {
    Serial.print("... readings: ");
    Serial.print(dxlGetPosition(base1Id));
    Serial.print(" ");
    Serial.print(dxlGetPosition(top1Id));
    Serial.print(" ");
    Serial.print(dxlGetPosition(base2Id));
    Serial.print(" ");
    Serial.print(dxlGetPosition(top2Id));
    Serial.println("");
    flagRead = false;
  }
}
