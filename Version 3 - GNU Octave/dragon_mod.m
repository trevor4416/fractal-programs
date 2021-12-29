## Copyright (C) 2021 Trevor Yates
##
## This program is free software: you can redistribute it and/or modify
## it under the terms of the GNU General Public License as published by
## the Free Software Foundation, either version 3 of the License, or
## (at your option) any later version.
##
## This program is distributed in the hope that it will be useful,
## but WITHOUT ANY WARRANTY; without even the implied warranty of
## MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
## GNU General Public License for more details.
##
## You should have received a copy of the GNU General Public License
## along with this program.  If not, see <https://www.gnu.org/licenses/>.

## -*- texinfo -*-
## @deftypefn {} {@var{retval} =} dragon_mod (@var{input1}, @var{input2})
##
## @seealso{}
## @end deftypefn

## Author: Trevor Yates <trevian2@trevorlaptop>
## Created: 2021-11-04

function retval = dragon_mod (sequence, n)
  x = [0, 0+1I];
  y = x;
  len = length(sequence);
  for iter = 1:n
    for iter2 = 1:len
      if sequence(iter2) == 0 %swap  between mod(iter,len)+1 and iter2
        %do left iteration
        phi_1 = y * (1/2 + I/2);
        phi_2 = y * (-1/2 + I/2) + I;
        y = [phi_1 flip(phi_2)];
        %plot(y);
        %axis equal;
        %pause(2);
        %clf;
      elseif sequence(iter2) == 1 %swap  between mod(iter,len)+1 and iter2
        %do right iteration
        phi_1 = y * (1/2 + -I/2);
        phi_2 = y * (-1/2 + -I/2) + I;
        y = [phi_1 flip(phi_2)];
        %plot(y);
        %axis equal;
        %pause(2);
        %clf;
      end
    endfor
  endfor
  p = plot(y);
  axis equal;
  %p.Color = '#000000';
  %p.LineWidth = 3;
  
endfunction