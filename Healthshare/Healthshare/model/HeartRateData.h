//
//  HeartRateData.h
//  Healthshare
//
//  Created by Nick Whitehead on 03/11/2017.
//  Copyright © 2017 Mobetrics Limited. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface HeartRateData : NSObject
{
    NSString* identifier;
    NSString* timestamp;
    NSString* device;
    NSString* heartRate;
    NSString* author;
}

- (id) initWithDictionary:(NSDictionary*)jsonDictionary;

- (NSString*) getIdentifier;
- (NSString*) getTimestamp;
- (NSString*) getDevice;
- (NSString*) getHeartRate;
- (NSString*) getAuthor;

@end


