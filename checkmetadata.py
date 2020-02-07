import ffmpy, subprocess, json
import argparse


def main():
    # Globals in Python are global to a module, not across all modules.
    # global validDatesDict
    # global stripDates

    # TODO: use command line parameters to determine path to scan
    # https://stackabuse.com/command-line-arguments-in-python/

    parser = argparse.ArgumentParser(
        description='checkmetadata')
    # parser.add_argument('-i','--input', help='Input file name', required=True)
    # generic directory scanning operations - into internal dictionary tree data structure
    parser.add_argument('-i','--input', help='Input file name')

    args = parser.parse_args()

    print ("Input file: %s" % args.input )

    # ffprobe = ffmpy.FFprobe(global_options="-loglevel quiet -sexagesimal -of json -show_entries stream=width,height,duration -show_entries format=duration -select_streams v:0", inputs={args.input : None})
    ffprobe = ffmpy.FFprobe(global_options="-show_format -of json", inputs={args.input : None})
    print("ffprobe.cmd:", ffprobe.cmd)  # printout the resulting ffprobe shell command
    stdout, stderr = ffprobe.run(stderr=subprocess.PIPE, stdout=subprocess.PIPE)
    # std* is byte sequence, but json in Python 3.5.2 requires str
    ff0string = str(stdout,'utf-8')

    ffinfo = json.loads(ff0string)
    print(json.dumps(ffinfo, indent=4)) # pretty print

    # print("Video Dimensions: {}x{}".format(ffinfo["streams"][0]["width"], ffinfo["streams"][0]["height"]))
    # print("Streams Duration:", ffinfo["streams"][0]["duration"])
    # print("Format Duration: ", ffinfo["format"]["duration"])

    if ("ensemble" in ffinfo["format"]["tags"]):
        print("ADS ensemble: ", ffinfo["format"]["tags"]["ensemble"])
    if ("boundary_condition" in ffinfo["format"]["tags"]):
        print("ADS boundary_condition: ", ffinfo["format"]["tags"]["boundary_condition"])
    if ("init" in ffinfo["format"]["tags"]):
        print("ADS init: ", ffinfo["format"]["tags"]["init"])
        
    if ("plot" in ffinfo["format"]["tags"]):
        print("ADS plot: ", ffinfo["format"]["tags"]["plot"])
    if ("plot_group" in ffinfo["format"]["tags"]):
        print("ADS plot_group: ", ffinfo["format"]["tags"]["plot_group"])


if __name__ == '__main__':
    main()
