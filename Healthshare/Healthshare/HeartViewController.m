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
    }
    
    
}

@end
