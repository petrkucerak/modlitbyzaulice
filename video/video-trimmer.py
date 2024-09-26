from moviepy.editor import VideoFileClip, concatenate_videoclips
from moviepy.video.fx.all import lum_contrast
import numpy as np
from PIL import Image


def adjust_temperature(frame, factor_red=1.0, factor_green=1.0, factor_blue=1.0):
    img = Image.fromarray(frame)
    r, g, b = img.split()
    r = r.point(lambda i: i * factor_red)  # Increase the blue channel
    g = g.point(lambda i: i * factor_green)  # Increase the blue channel
    b = b.point(lambda i: i * factor_blue)  # Increase the blue channel
    img = Image.merge('RGB', (r, g, b))
    return np.array(img)


# Load the two 4K video clips
video1 = VideoFileClip("jenda.mp4")
video2 = VideoFileClip("ulice.mp4")

# Apply a brightness/contrast change to the first video
colored_video1 = lum_contrast(video1, lum=0.5, contrast=0.05)

# Apply the colder temperature effect
colder_video1 = colored_video1.fl_image(lambda frame: adjust_temperature(
    frame, factor_red=0.9, factor_green=1.05, factor_blue=1.25))

# Concatenate the two videos
final_video = concatenate_videoclips([colder_video1, video2])

# Export the final video
final_video.write_videofile(
    "final_output.mp4", codec="libx264", bitrate="8000k")
