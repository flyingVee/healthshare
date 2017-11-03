//
//  HeartRateDataSet.h
//  Healthshare
//
//  Created by Nick Whitehead on 03/11/2017.
//  Copyright © 2017 Mobetrics Limited. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HeartRateData.h"

@interface HeartRateDataSet : NSObject
{
    NSMutableArray* array;
}

- (id) initWithData:(NSData*)jsonData;
- (NSUInteger) count;
- (HeartRateData*) objectAtIndex:(NSUInteger)index;

@end
