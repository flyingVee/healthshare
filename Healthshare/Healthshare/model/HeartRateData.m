//
//  HeartRateData.m
//  Healthshare
//
//  Created by Nick Whitehead on 03/11/2017.
//  Copyright © 2017 Mobetrics Limited. All rights reserved.
//

#import "HeartRateData.h"

@implementation HeartRateData

- (id) initWithDictionary:(NSDictionary*)jsonDictionary
{
    if (self = [super init]) {
        identifier = [jsonDictionary valueForKey:@"_id"];
        timestamp = [jsonDictionary valueForKey:@"timestamp"];
        device = [jsonDictionary valueForKey:@"device"];
        heartRate = [jsonDictionary valueForKey:@"hr"];
        author = [jsonDictionary valueForKey:@"author"];
    }
    return self;
}

- (NSString*)getIdentifier
{
    return identifier;
}

- (NSString*) getTimestamp
{
    return timestamp;
}

- (NSString*) getDevice
{
    return device;
}

- (NSString*) getHeartRate
{
    return heartRate;
}

- (NSString*) getAuthor
{
    return author;
}

@end
