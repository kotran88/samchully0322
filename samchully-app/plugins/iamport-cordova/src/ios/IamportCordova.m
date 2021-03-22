/********* IamportCordova.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>
#import "IamportCordova.h"
#import "IamportPaymentViewController.h"
#import "IamportInicisViewController.h"
#import "IamportNiceViewController.h"
#import "IamportCertificationViewController.h"

@implementation IamportCordova {
}

- (void)startActivity: (CDVInvokedUrlCommand*)command
{
    NSString* type = [command.arguments objectAtIndex:0];
    NSDictionary* titleData = [command.arguments objectAtIndex:1];
    NSObject* params = [command.arguments objectAtIndex:2];
    
    IamportViewController *iamportViewController = nil;
    if ([type isEqualToString:@"nice"]) {
        iamportViewController = [[IamportNiceViewController alloc] init];
    } else if ([type isEqualToString:@"inicis"]) {
        iamportViewController = [[IamportInicisViewController alloc] init];
    } else if ([type isEqualToString:@"certification"]) {
        iamportViewController = [[IamportCertificationViewController alloc] init];
    } else {
        iamportViewController = [[IamportPaymentViewController alloc] init];
    }

    iamportViewController.type = type;
    iamportViewController.titleData = titleData;
    iamportViewController.params = params;
    /*
     delegate 메소드에 전달
     delegate 메소드에서 self.commandDelegate와 command.callbackId에 접근할 수 없는 점 방지
     */
    iamportViewController.callbackId = command.callbackId;
    iamportViewController.commandDelegate = self.commandDelegate;
    
    if ([self isNavigationBarHidden:titleData]) {
        [self.viewController presentViewController:iamportViewController animated:YES completion:nil];
    } else {
        /*
         NavigationController 설정
         */
        UINavigationController *navigationController = [[UINavigationController alloc] initWithRootViewController:iamportViewController];
        
        NSString *name = [titleData valueForKey:@"name"];
        NSString *color = [titleData valueForKey:@"color"];
        UIBarButtonItem *closeButton = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemStop target:self action:@selector(onClose)];
        
        navigationController.navigationBar.topItem.title = name;
        navigationController.navigationBar.translucent = NO;
        navigationController.navigationBar.barTintColor = [self colorFromHexString:color];
        navigationController.navigationBar.topItem.rightBarButtonItem = closeButton;

        [self.viewController presentViewController:navigationController animated:YES completion:nil];
    }
}

- (BOOL)isNavigationBarHidden:(NSDictionary *)titleData
{
    return [titleData count] == 0;
}

- (UIColor *)colorFromHexString:(NSString *)hexString
{
    unsigned rgbValue = 0;
    NSScanner *scanner = [NSScanner scannerWithString:hexString];
    [scanner setScanLocation:1]; // bypass '#' character
    [scanner scanHexInt:&rgbValue];
    return [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0 green:((rgbValue & 0xFF00) >> 8)/255.0 blue:(rgbValue & 0xFF)/255.0 alpha:1.0];
}

- (void)onClose
{
    [self.viewController dismissViewControllerAnimated:YES completion:nil];
}

- (void)setDelegate:(id<IamportDelegate>)delegate
{
    _delegate = delegate;
}

- (void)onOver:(NSString*)url callbackId:(NSString *)callbackId commandDelegate: (id<CDVCommandDelegate>)commandDelegate
{
    /*
     결제완료 후 CDV에 결제 결과 URL 전달
     */
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:url];
    [commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

@end
