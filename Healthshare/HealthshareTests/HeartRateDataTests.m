//
//  HeartRateDataTests.m
//  HealthshareTests
//
//  Created by Nick Whitehead on 03/11/2017.
//  Copyright © 2017 Mobetrics Limited. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "HeartRateData.h"

@interface HeartRateDataTests : XCTestCase

@end

@implementation HeartRateDataTests

- (void)setUp {
    [super setUp];
}

- (void)tearDown {
    [super tearDown];
}

- (void)testInitWithDictionary {
    NSString* heartRateDataString = @"{\"_id\":\"599413fa1616ae3856ca0e1f\",\"timestamp\":\"2017-08-16T10:44:25+0100\",\"device\":\"mio\",\"hr\":\"104\",\"author\":\"james\"}";
    
    NSError* jsonError;
    NSData* heartRateDataJson = [heartRateDataString dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary* heartRateDataDictionary = [NSJSONSerialization JSONObjectWithData:heartRateDataJson
                                                         options:NSJSONReadingMutableContainers
                                                           error:&jsonError];
    
    HeartRateData* heartRateData = [[HeartRateData alloc] initWithDictionary:heartRateDataDictionary];
    XCTAssertTrue([[heartRateData getIdentifier] isEqualToString:@"599413fa1616ae3856ca0e1f"]);
    XCTAssertTrue([[heartRateData getTimestamp] isEqualToString:@"2017-08-16T10:44:25+0100"]);
    XCTAssertTrue([[heartRateData getDevice] isEqualToString:@"mio"]);
    XCTAssertTrue([[heartRateData getHeartRate] isEqualToString:@"104"]);
    XCTAssertTrue([[heartRateData getAuthor] isEqualToString:@"james"]);
}

@end
