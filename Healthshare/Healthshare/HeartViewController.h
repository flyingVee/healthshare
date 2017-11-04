//
//  HeartViewController.h
//  Healthshare
//
//  Created by Nick Whitehead on 03/11/2017.
//  Copyright © 2017 Mobetrics Limited. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreMotion/CoreMotion.h>

@interface HeartViewController : UIViewController
{
    NSMutableArray* activityArray;
}
@property (weak, nonatomic) IBOutlet UIWebView* webView;
@property (strong, nonatomic) CMMotionManager* motionManager;

@end
