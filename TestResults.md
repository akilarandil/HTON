# Performance Testing

HTON was benchmarked against HTML, XML and JSON. Following is result that should be displayed using all 4 data structures on the web page.

![picture](HTON/src/TestResults/Expected%20Result.png)

The testing were done under the following system variables

Environmental Variables –

• Machine – MacBook Pro (15-inch, 2017)

• OS – macOS High Sierra 10.13.3

• Storage – 256 Flash Storage

• Memory – 16 GB

• Browser – Safari Version 11.0.3 (13604.5.6)

Remote Server –

• OS – Linux

• Storage – 500 MB

• PHP Version – 7.0

• Internet (At the time of the test)

Connection – Fiber

• Download Bandwidth – 55 Mbps

• Upload Bandwidth – 45.3 Mbps

The testing were done for 5 aspects.


1. Serialization Time 
2. De-Serialization Time 
3. Request-Response Time 
4. Total Time
5. Message Size

## Serialization Time

Time is in Pico Second

| DataSets/DS  |  HTML   | JSON    | XML       | HTON     |
|---		   |---	     |------   |---        |---       |
|1  		   | 19.782  |26.356   | 656.0836  | 172.563  |
|10  		   | 25.704  |37.457   | 854.673   | 343.930  |
|20 		   | 31.754  |48.341   | 1,057.163 | 521.486  |
|50  		   | 44.914  |75.956   | 1,473.599 | 874.066  |
|100  		   | 64.577  |115.774  | 2,148.923 | 1,432.632|

![picture](HTON/src/TestResults/Serialization.png)

## De-Serialization Time

Time is in Milliseconds 

| DataSets/DS  |  HTML   | JSON    | XML       | HTON     |
|---		   |---	     |------   |---        |---       |
|1  		   | 0.324   |0.367  | 0.552  | 0.351  |
|10  		   | 0.598  |0.659   | 1.003   | 0.785  |
|20 		   | 0.854  |0.976   | 1.534 | 1.301  |
|50  		   | 1.763  |1.978   | 2.872 | 2.574  |
|100  		   | 3.07  |3.44  | 4.938 | 4.386|

![picture](HTON/src/TestResults/DeSerialization.png)

## Request-Response Time

Time is in Milliseconds

| DataSets/DS  |  HTML   | JSON    | XML       | HTON     |
|---		   |---	     |------   |---        |---       |
|1  		   | 354.906   |362.94  | 428.932  | 374.969  |
|10  		   | 388.708  |355.598   | 350.27   | 380.051  |
|20 		   | 358.826  |373.066   | 367.94 | 350.772  |
|50  		   | 354.435  |365.11   | 354.075 | 370.33  |
|100  		   | 373.901  |386.698  | 366.707 | 363.326|

![picture](HTON/src/TestResults/RequestResponse.png)

## Total Time

Time is in Milliseconds

| DataSets/DS  |  HTML   | JSON    | XML       | HTON     |
|---		   |---	     |------   |---        |---       |
|1  		   | 355.364   |363.443  | 429.589  | 375.442  |
|10  		   | 389.403  |356.363   | 351.388   | 380.96  |
|20 		   | 359.779  |374.159   | 369.593 | 352.165  |
|50  		   | 356.305  |367.206   | 357.045 | 373.016  |
|100  		   | 377.059  |390.239  | 371.752 | 367.84|

![picture](HTON/src/TestResults/Total.png)

## Message Size

Size is in Bytes

| DataSets/DS  |  HTML   | JSON    | XML       | HTON     |
|---		   |---	     |------   |---        |---       |
|1  		   | 202   |98  | 188  | 165  |
|10  		   | 1165  |971   | 1403   | 930  |
|20 		   | 2235  |1941   | 2753 | 1780  |
|50  		   | 5445  |4851   | 6803 | 4330  |
|100  		   | 10795  |9701  | 13553 | 8580|


![picture](HTON/src/TestResults/MessageSize.png)
