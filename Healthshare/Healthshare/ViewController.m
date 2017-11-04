//
//  ViewController.m
//  Healthshare
//
//  Created by Nick Whitehead on 03/11/2017.
//  Copyright © 2017 Mobetrics Limited. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.centralManager = [[CBCentralManager alloc] initWithDelegate:self queue:nil];
    self.data = [[NSMutableData alloc] init];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (void)centralManagerDidUpdateState:(CBCentralManager *)central
{
    if (central.state != CBCentralManagerStatePoweredOn) {
        return;
    }
    
    if (central.state == CBCentralManagerStatePoweredOn) {
        // Scan for devices
        [self.centralManager scanForPeripheralsWithServices:nil options:@{ CBCentralManagerScanOptionAllowDuplicatesKey : @YES }];
        NSLog(@"Scanning started");
    }
}

- (void)centralManager:(CBCentralManager *)central didDiscoverPeripheral:(CBPeripheral *)peripheral advertisementData:(NSDictionary *)advertisementData RSSI:(NSNumber *)RSSI
{
    if ([peripheral.name isEqualToString:@"Amiigo WED"])
    {
        NSLog(@"Connecting to %@", peripheral.name);
        
        self.discoveredPeripheral = peripheral;
        
        [self.centralManager connectPeripheral:peripheral options:nil];
    }
}

- (void)centralManager:(CBCentralManager *)central didConnectPeripheral:(CBPeripheral *)peripheral
{
    NSLog(@"Connected to %@", peripheral.name);
    [self.centralManager stopScan];
    NSLog(@"Scanning stopped");
    
    [_data setLength:0];
    
    peripheral.delegate = self;
    
    [peripheral discoverServices:nil];
}

- (void)peripheral:(CBPeripheral *)peripheral didDiscoverServices:(NSError *)error
{
    NSLog(@"didDiscoverServices for %@", peripheral.name);
    if (error) {
        [self cleanup];
        return;
    }
    
    for (CBService *service in peripheral.services) {
        CBUUID* uuid = service.UUID;
        NSLog(@"Found service with UUID %@", [uuid UUIDString]);
        // 180A == Device Infomation (maufacturer, firmware, etc...)
        if ([uuid.UUIDString isEqualToString:@"CCA31000-78C6-4785-9E45-0887D451317C"])
        {
            NSLog(@"Discovering characteristics for service with UUID %@", [uuid UUIDString]);
            [peripheral discoverCharacteristics:nil forService:service];
        }
    }
}

- (void)centralManager:(CBCentralManager *)central didFailToConnectPeripheral:(CBPeripheral *)peripheral error:(NSError *)error
{
    NSLog(@"Failed to connect");
    [self cleanup];
}

- (void)peripheral:(CBPeripheral *)peripheral didDiscoverCharacteristicsForService:(CBService *)service error:(NSError *)error {
    if (error) {
        NSLog(@"error in didDiscoverCharacteristicsForService");
        [self cleanup];
        return;
    }
    
    for (CBCharacteristic *characteristic in service.characteristics) {
        //if ([characteristic.UUID isEqual:[CBUUID UUIDWithString:TRANSFER_CHARACTERISTIC_UUID]]) {
        //    [peripheral setNotifyValue:YES forCharacteristic:characteristic];
        //}
        
        NSLog(@"Found characteristic with UUID %@", characteristic.UUID.UUIDString);
        [peripheral readValueForCharacteristic:characteristic];
        
        //if (characteristic.isNotifying)
        //{
        //    NSLog(@"found notifying characteristic");
        //}
    }
}

- (void)peripheral:(CBPeripheral *)peripheral didUpdateNotificationStateForCharacteristic:(CBCharacteristic *)characteristic error:(NSError *)error {
    
    if (characteristic.isNotifying) {
        NSLog(@"Notification began on %@", characteristic);
    } else {
        // Notification has stopped
        NSLog(@"Notification stopped on %@", characteristic);
        //[self.centralManager cancelPeripheralConnection:peripheral];
    }
}

- (void)peripheral:(CBPeripheral *)peripheral didUpdateValueForCharacteristic:(CBCharacteristic *)characteristic error:(NSError *)error {

    if (error) {
        NSLog(@"Error");
        return;
    }
    NSData* value = [characteristic value];
    
    NSString *stringFromData = [[NSString alloc] initWithData:value encoding:NSUTF8StringEncoding];
    
    NSLog(@"%@-%@: %@", peripheral.name, characteristic.UUID.UUIDString, stringFromData);
}
 
- (void)cleanup {
    
    // See if we are subscribed to a characteristic on the peripheral
    if (self.discoveredPeripheral.services != nil) {
        for (CBService *service in self.discoveredPeripheral.services) {
            if (service.characteristics != nil) {
                for (CBCharacteristic *characteristic in service.characteristics) {
                    //if ([characteristic.UUID isEqual:[CBUUID UUIDWithString:TRANSFER_CHARACTERISTIC_UUID]]) {
                        if (characteristic.isNotifying) {
                            [_discoveredPeripheral setNotifyValue:NO forCharacteristic:characteristic];
                            return;
                        }
                    //}
                }
            }
        }
    }
    
    [_centralManager cancelPeripheralConnection:self.discoveredPeripheral];
}

@end
