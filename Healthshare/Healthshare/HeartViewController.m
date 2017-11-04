//
//  HeartViewController.m
//  Healthshare
//
//  Created by Nick Whitehead on 03/11/2017.
//  Copyright © 2017 Mobetrics Limited. All rights reserved.
//

#import "HeartViewController.h"

@interface HeartViewController ()

@end

@implementation HeartViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    currentHeartRate = 72.0;
    activityArray = [[NSMutableArray alloc] initWithCapacity:10];
    
    self.webView.scrollView.bounces = NO;
    
    NSURLRequest* localHtml = [NSURLRequest requestWithURL:[NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"data/heartsimulation-master/src/index" ofType:@"html"]isDirectory:NO]];
    [self.webView loadRequest:localHtml];
    
    self.motionManager = [[CMMotionManager alloc] init];
    //[self.motionManager setAccelerometerUpdateInterval:1000];
    //[self.motionManager setGyroUpdateInterval:1000];

    [self.motionManager startDeviceMotionUpdatesToQueue:[NSOperationQueue currentQueue]
                                            withHandler:^(CMDeviceMotion* motionData, NSError *error) {
                                                [self processAcceleration:motionData.userAcceleration];
                                                if(error){
                                                    NSLog(@"%@", error);
                                                }
                                            }];
}

- (void)viewWillDisappear:(BOOL)animated
{
    [self.motionManager stopDeviceMotionUpdates];
    [super viewWillDisappear:animated];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

-(void)processAcceleration:(CMAcceleration)userAcceleration
{
    double activityX = fabs(userAcceleration.x);
    double activityY = fabs(userAcceleration.y);
    double activityZ = fabs(userAcceleration.z);
    
    double activity = (activityX + activityY + activityZ) / 3.0;
    [activityArray addObject:[NSNumber numberWithDouble:activity]];
    
    if (activityArray.count == 10)
    {
        double activityOverTenUpdates = 0.0;
        for (NSNumber* x in activityArray)
        {
            activityOverTenUpdates += x.doubleValue;
        }
        [activityArray removeAllObjects];
        
        NSLog(@"activityOverTenUpdates: %f", activityOverTenUpdates);
        [self adjustCurrentHeartRateBasedOnActivity: activityOverTenUpdates];
        NSLog(@"currentHeartRate: %d", (int)currentHeartRate);
        
        NSString* function = [[NSString alloc] initWithFormat: @"input(%d, %f)", (int)currentHeartRate, activityOverTenUpdates];
        [self.webView stringByEvaluatingJavaScriptFromString:function];
    }
}

- (void)adjustCurrentHeartRateBasedOnActivity:(double)activity
{
    double targetHeartRate = [self targetHeartRateForActivity: activity];
    if (targetHeartRate > currentHeartRate)
    {
        currentHeartRate += 0.03;
    }
    else
    {
        if (currentHeartRate > 72.1)
        {
            currentHeartRate -= 0.01;
        }
    }
}

- (double)targetHeartRateForActivity:(double)activity
{
    double result = 72.0;
    if (activity > 0.5 && activity <= 2.0)
    {
        result = 73.0;
    }
    else if (activity > 2.0 && activity <= 4.0)
    {
        result = 75.0;
    }
    else if (activity > 4.0 && activity <= 6.0)
    {
        result = 77.0;
    }
    else if (activity > 6.0 && activity <= 8.0)
    {
        result = 79.0;
    }
    else if (activity > 8.0 && activity <= 10.0)
    {
        result = 81.0;
    }
    else if (activity > 10.0 && activity <= 12.0)
    {
        result = 83.0;
    }
    else if (activity > 12.0 && activity <= 12.0)
    {
        result = 85.0;
    }
    else if (activity > 14.0 && activity <= 12.0)
    {
        result = 87.0;
    }
    else if (activity > 16.0 && activity <= 12.0)
    {
        result = 89.0;
    }
    else if (activity > 18.0 && activity <= 12.0)
    {
        result = 91.0;
    }
    else if (activity > 20.0 && activity <= 12.0)
    {
        result = 93.0;
    }
    else if (activity > 22.0 && activity <= 12.0)
    {
        result = 95.0;
    }
    else if (activity > 24.0 && activity <= 12.0)
    {
        result = 97.0;
    }
    else if (activity > 26.0 && activity <= 12.0)
    {
        result = 99.0;
    }
    else if (activity > 28.0 && activity <= 12.0)
    {
        result = 101.0;
    }
    else if (activity > 30.0 && activity <= 12.0)
    {
        result = 103.0;
    }
    return result;
}

@end
