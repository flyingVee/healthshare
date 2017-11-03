//
//  HeartRateDataSet.m
//  Healthshare
//
//  Created by Nick Whitehead on 03/11/2017.
//  Copyright © 2017 Mobetrics Limited. All rights reserved.
//

#import "HeartRateDataSet.h"

@implementation HeartRateDataSet

- (id) initWithData:(NSData*)jsonData
{
    if (self = [super init]) {
        array = [[NSMutableArray alloc] init];
        array = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:nil];
    }
    return self;
}

- (NSUInteger) count
{
    return [array count];
}

- (HeartRateData*) objectAtIndex:(NSUInteger)index
{
    NSDictionary* json = [array objectAtIndex:index];
    return [[HeartRateData alloc] initWithDictionary:json];
}

@end
