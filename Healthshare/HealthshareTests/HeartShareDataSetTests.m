//
//  HeartShareDataSetTests.m
//  HealthshareTests
//
//  Created by Nick Whitehead on 03/11/2017.
//  Copyright © 2017 Mobetrics Limited. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "HeartRateDataSet.h"

@interface HeartShareDataSetTests : XCTestCase

@end

@implementation HeartShareDataSetTests

- (void)setUp {
    [super setUp];
}

- (void)tearDown {
    [super tearDown];
}

- (void)testInitWithData
{
    NSString* dataString = @"[{\"_id\":\"59fc5261ab15ab3a81dd38f7\",\"timestamp\":\"2017-11-03T11:26:25+0000\",\"device\":\"mio\",\"hr\":\"113\",\"author\":\"james\"},{\"_id\":\"59fc5262ab15ab3a81dd38f8\",\"timestamp\":\"2017-11-03T11:26:26+0000\",\"device\":\"mio\",\"hr\":\"113\",\"author\":\"james\"},{\"_id\":\"59fc5263ab15ab3a81dd38f9\",\"timestamp\":\"2017-11-03T11:26:27+0000\",\"device\":\"mio\",\"hr\":\"112\",\"author\":\"james\"},{\"_id\":\"59fc5264ab15ab3a81dd38fa\",\"timestamp\":\"2017-11-03T11:26:28+0000\",\"device\":\"mio\",\"hr\":\"111\",\"author\":\"james\"},{\"_id\":\"59fc5265ab15ab3a81dd38fb\",\"timestamp\":\"2017-11-03T11:26:29+0000\",\"device\":\"mio\",\"hr\":\"111\",\"author\":\"james\"},{\"_id\":\"59fc5266ab15ab3a81dd38fc\",\"timestamp\":\"2017-11-03T11:26:30+0000\",\"device\":\"mio\",\"hr\":\"111\",\"author\":\"james\"},{\"_id\":\"59fc5267ab15ab3a81dd38fd\",\"timestamp\":\"2017-11-03T11:26:31+0000\",\"device\":\"mio\",\"hr\":\"111\",\"author\":\"james\"},{\"_id\":\"59fc5268ab15ab3a81dd38fe\",\"timestamp\":\"2017-11-03T11:26:32+0000\",\"device\":\"mio\",\"hr\":\"112\",\"author\":\"james\"},{\"_id\":\"59fc5269ab15ab3a81dd38ff\",\"timestamp\":\"2017-11-03T11:26:33+0000\",\"device\":\"mio\",\"hr\":\"112\",\"author\":\"james\"},{\"_id\":\"59fc526aab15ab3a81dd3900\",\"timestamp\":\"2017-11-03T11:26:34+0000\",\"device\":\"mio\",\"hr\":\"111\",\"author\":\"james\"},{\"_id\":\"59fc5272ab15ab3a81dd3901\",\"timestamp\":\"2017-11-03T11:26:35+0000\",\"device\":\"mio\",\"hr\":\"111\",\"author\":\"james\"},{\"_id\":\"59fc5276ab15ab3a81dd3902\",\"timestamp\":\"2017-11-03T11:26:39+0000\",\"device\":\"mio\",\"hr\":\"113\",\"author\":\"james\"}]";
    
    NSData* heartRateDataSetJson = [dataString dataUsingEncoding:NSUTF8StringEncoding];
    
    HeartRateDataSet* heartRateDataSet = [[HeartRateDataSet alloc] initWithData:heartRateDataSetJson];
    XCTAssertEqual(12, [heartRateDataSet count]);
    HeartRateData* heartRateData = [heartRateDataSet objectAtIndex:0];
    XCTAssertTrue([[heartRateData getIdentifier] isEqualToString:@"59fc5261ab15ab3a81dd38f7"]);
    XCTAssertTrue([[heartRateData getTimestamp] isEqualToString:@"2017-11-03T11:26:25+0000"]);
    XCTAssertTrue([[heartRateData getDevice] isEqualToString:@"mio"]);
    XCTAssertTrue([[heartRateData getHeartRate] isEqualToString:@"113"]);
    XCTAssertTrue([[heartRateData getAuthor] isEqualToString:@"james"]);
    
}

@end
