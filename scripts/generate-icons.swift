import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

let sizes = [16, 32, 48, 128]
let outputDirectory = URL(fileURLWithPath: "icons", isDirectory: true)

func makePath() -> CGMutablePath {
    let path = CGMutablePath()

    path.move(to: CGPoint(x: 9, y: 10.2))
    path.addCurve(
        to: CGPoint(x: 4.4, y: 10.2),
        control1: CGPoint(x: 7.7, y: 8.9),
        control2: CGPoint(x: 5.7, y: 8.9)
    )
    path.addLine(to: CGPoint(x: 2.8, y: 11.8))
    path.addCurve(
        to: CGPoint(x: 2.8, y: 17.7),
        control1: CGPoint(x: 1.2, y: 13.4),
        control2: CGPoint(x: 1.2, y: 16.1)
    )
    path.addCurve(
        to: CGPoint(x: 8.7, y: 17.7),
        control1: CGPoint(x: 4.4, y: 19.3),
        control2: CGPoint(x: 7.1, y: 19.3)
    )
    path.addLine(to: CGPoint(x: 10.1, y: 16.3))

    path.move(to: CGPoint(x: 13.9, y: 7.7))
    path.addLine(to: CGPoint(x: 15.3, y: 6.3))
    path.addCurve(
        to: CGPoint(x: 21.2, y: 6.3),
        control1: CGPoint(x: 16.9, y: 4.7),
        control2: CGPoint(x: 19.6, y: 4.7)
    )
    path.addCurve(
        to: CGPoint(x: 21.2, y: 12.2),
        control1: CGPoint(x: 22.8, y: 7.9),
        control2: CGPoint(x: 22.8, y: 10.6)
    )
    path.addLine(to: CGPoint(x: 19.6, y: 13.8))
    path.addCurve(
        to: CGPoint(x: 15, y: 13.8),
        control1: CGPoint(x: 18.3, y: 15.1),
        control2: CGPoint(x: 16.3, y: 15.1)
    )

    path.move(to: CGPoint(x: 8.8, y: 15.2))
    path.addLine(to: CGPoint(x: 15.2, y: 8.8))
    return path
}

for size in sizes {
    let colorSpace = CGColorSpaceCreateDeviceRGB()
    let bitmapInfo = CGImageAlphaInfo.premultipliedLast.rawValue
        | CGBitmapInfo.byteOrder32Big.rawValue

    guard let context = CGContext(
        data: nil,
        width: size,
        height: size,
        bitsPerComponent: 8,
        bytesPerRow: size * 4,
        space: colorSpace,
        bitmapInfo: bitmapInfo
    ) else {
        fatalError("Could not create a \(size)x\(size) canvas")
    }

    let scale = CGFloat(size) / 24
    context.translateBy(x: 0, y: CGFloat(size))
    context.scaleBy(x: scale, y: -scale)
    context.setStrokeColor(CGColor(red: 230 / 255, green: 33 / 255, blue: 23 / 255, alpha: 1))
    context.setLineWidth(2.5)
    context.setLineCap(.round)
    context.setLineJoin(.round)
    context.addPath(makePath())
    context.strokePath()

    guard let image = context.makeImage() else {
        fatalError("Could not render the \(size)x\(size) icon")
    }

    let outputURL = outputDirectory.appendingPathComponent("icon-\(size).png")
    guard let destination = CGImageDestinationCreateWithURL(
        outputURL as CFURL,
        UTType.png.identifier as CFString,
        1,
        nil
    ) else {
        fatalError("Could not create \(outputURL.path)")
    }

    CGImageDestinationAddImage(destination, image, nil)
    guard CGImageDestinationFinalize(destination) else {
        fatalError("Could not save \(outputURL.path)")
    }
}
