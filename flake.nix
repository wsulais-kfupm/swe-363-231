{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    # nixpkgs.url = "github:NixOS/nixpkgs/haskell-updates";
    flake-utils = {
      url = "github:numtide/flake-utils";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            allowUnfree = true;
          };
        };
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodePackages.vscode-langservers-extracted
            nodePackages.tailwindcss
            nodePackages.npm
            nodePackages.nodejs
            deno
          ];
        };
      }
    );
}
