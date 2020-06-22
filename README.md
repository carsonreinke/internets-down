# Internets Down?

A silly command line utility to check network connection and do some simple tests to understand what the current problem is, if any.

Currently, it performs the following checks:

*  Check there is an active network connection (e.g. connected to WiFi)
*  Ping internal and external gateway (if available)
*  Ping default DNS and an additional DNS server
*  Perform a DNS lookup
*  Make a HTTPS connection

## Why?

First, to understand and learn TypeScript, second, because I actually need to use this.

## Installation

    $ npm i -g internets-down

## Usage

Simply just run from the command line: 

    $ internets-down

Results will be similar to the following:
```
✔ Loading network information
✔ Checking network interface
✔ Checking gateway
✔ Checking DNS
✔ Checking DNS lookup
✔ Checking HTTP

All checks passed 🙂
```

A few options can be provided from the command and are visible using the `internets-down --help`:
```
Usage: internets-down [options]

Options:
  -V, --version      output the version number
  --dns <ip>         Additional DNS server to check (default: "1.1.1.1")
  --gateway <ip>     External gateway to check
  --hostname <host>  Hostname to check (default: "example.com")
  -h, --help         display help for command
```

Non-zero exit code indicates failures.  Time outs are set to 1 second.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/carsonreinke/internets-down.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
